import {
  Observable,
  retry,
  retryWhen,
  delay,
  mergeMap,
  of,
  throwError,
} from 'rxjs';

export function RetryWhenPipe<T>(delayTime = 1000, retryCount = 3) {
  let retries = retryCount;
  return (src: Observable<T>): Observable<T> => {
    return src.pipe(
      retryWhen((error) => {
        return error.pipe(
          delay(delayTime),
          mergeMap((error) => {
            return --retries > 0 ? of(error) : throwError(() => error);
          })
        );
      })
    );
  };
}

/**
 * Comment
 *
 * @returns {MethodDecorator}
 */
export function RetryWhenMethod(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalFunc = descriptor.value;
    descriptor.value = function (...args) {
      const returnValue: Observable<any> = originalFunc.apply(this, args);
      return returnValue.pipe(RetryWhenPipe());
    };
  };
}

/**
 * Comment
 *
 * @returns {ClassDecorator}
 */
export function RetryWhenClass(): ClassDecorator {
  return function <TFunction extends Function>(target: TFunction) {
    const ds = Object.getOwnPropertyDescriptors(target.prototype);
    for (let propertyName in ds) {
      const descriptor = ds[propertyName];
      const original = descriptor.value;

      if (!(original instanceof Function)) continue;

      descriptor.value = function (...args) {
        const result: Observable<any> = original.apply(this, args);
        if (result instanceof Observable) {
          return result.pipe(RetryWhenPipe());
        }
        return result;
      };
      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
  };
}

/**
 * Декоратор для повторных попыток при неудачных запросах
 *
 * @param [delayMs=1000] задержка между повторными попытками
 * @param [maxRetry=3] количество повторных попыток
 * @param [filter=(name: string) => true] фильтрация функций, которые обрабатываются
 * @return функция декоратор. Применяем @delayRetry()
 */

export const RetryWhen = (dekayMs = 1000, tryCount = 3, filter = (name) => true) => {
  return (...args) => {
    switch (args.length) {
      case 1:
        const target = args[0];
        const ds = Object.getOwnPropertyDescriptors(target.prototype);
        for (let propertyName in ds) {
          if (!filter(propertyName)) continue
          const descriptor = ds[propertyName];
          const original = descriptor.value;

          if (!(original instanceof Function)) continue;

          descriptor.value = function (...args) {
            const result: Observable<any> = original.apply(this, args);
            if (result instanceof Observable) {
              return result.pipe(RetryWhenPipe());
            }
            return result;
          };
          Object.defineProperty(target.prototype, propertyName, descriptor);
        }
        break;

      case 3:
        const descriptor = args[2];
        const originalFunc = descriptor.value;
        descriptor.value = function (...args) {
          const returnValue: Observable<any> = originalFunc.apply(this, args);
          return returnValue.pipe(RetryWhenPipe());
        };
        break;
    }
  };
};
