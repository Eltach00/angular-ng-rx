import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
/**
 * Comment
 *
 * @returns {MethodDecorator}
 */
export function AutoUnsubscribe(): MethodDecorator {
  return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor){
    const stop$ = new Subject<void>()
    const originalDestroy = target.ngOnDestroy
    target.ngOnDestroy = function(...args: any[]) {
      stop$.next()
      originalDestroy?.apply(this, args)
    }

    const origin = descriptor.value
    descriptor.value = function(...args) {
      const result: Observable<any> = origin.apply(this, args)
      return result.pipe(takeUntil(stop$), take(1))
    }
  }
}

export interface IAutoSubscribeOption
{
  isAutoSubscribeOnInit?: boolean;
  onNext?: (arg: any) => void;
  onError?: (arg: any) => void;
}

const isDestroyHandledMap = new Map<Function, boolean>();
const SubscriptionMap = new Map<Function, Map<string, Subscription>>();

export function AutoSubscribe(options: IAutoSubscribeOption = { isAutoSubscribeOnInit: true }): MethodDecorator
{
  return (target: any, name: string | symbol, descriptor: PropertyDescriptor) =>
  {
    const key = name as string;

    let subs: Map<string, Subscription>;

    if (SubscriptionMap.has(target.constructor))
      subs = SubscriptionMap.get(target.constructor) as Map<string, Subscription>;
    else
      SubscriptionMap.set(target.constructor, subs = new Map<string, Subscription>());

    const origin = descriptor.value;

    if (!!options.isAutoSubscribeOnInit)
    {
      const originalOnInit = target.ngOnInit;
      target.ngOnInit = function (...args: any[])
      {
        const subscription = origin
          .apply(this, args)
          .subscribe({
            next: (arg: any) => options?.onNext?.apply(this, [arg]),
            error: (err: any) => options?.onError?.apply(this, [err])
          });

        subs?.get(key)?.unsubscribe();
        subs?.set(key, subscription);

        originalOnInit?.apply(this, args);
      };
    }
    else
      descriptor.value = function (...args: any[])
      {
        const subscription = origin
          .apply(this, args)
          .subscribe({
            next: (arg: any) => options?.onNext?.apply(this, [arg]),
            error: (err: any) => options?.onError?.apply(this, [err])
          });

        subs?.get(key)?.unsubscribe();
        subs?.set(key, subscription);
      };

    if (isDestroyHandledMap.has(target.constructor)) return;

    const originalOnDestroy = target.ngOnDestroy;
    target.ngOnDestroy = function (...args: any[])
    {
      // Отписываемся
      for (const key of subs.keys()) subs.get(key)?.unsubscribe()

      SubscriptionMap.delete(target.constructor);
      originalOnDestroy?.apply(this, args);
    };

    isDestroyHandledMap.set(target.constructor, true);
  }
}
