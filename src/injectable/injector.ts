interface Type<T> {
  new (...args: any[]): T;
}

export function Injectable() {
  return function <T>(target: Type<T>) {
    Reflect.getMetadata('design:paramtypes', target);
  };
}

export class Injector {
  private static container = new Map<string, any>();

  static resolve<T>(target: Type<T>): T {
    if (Injector.container.has(target.name)) {
      return Injector.container.get(target.name);
    }

    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: Type<any>): any => Injector.resolve(token));
    const instance = new target(...injections);
    Injector.container.set(target.name, instance);
    return instance;
  }
}
