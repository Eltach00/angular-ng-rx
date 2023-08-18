import { Observable, Subject, take, takeUntil } from 'rxjs';
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
