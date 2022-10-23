interface ClassConstructor {
  new (...args: any[]): {};
}

function applyMixins(target: ClassConstructor, constructors: ClassConstructor[]) {
  let currentPropertyDescriptor = null;

  constructors.forEach(constructor => {
    Object.getOwnPropertyNames(constructor.prototype).forEach(property => {
      currentPropertyDescriptor =
        Object.getOwnPropertyDescriptor(constructor.prototype, property) || Object.create(null);

      Object.defineProperty(target.prototype, property, currentPropertyDescriptor);
    });
  });
}

function applyProperties<T extends Object = Object>(
  target: ClassConstructor,
  constructors: ClassConstructor[],
): T {
  let constructoredTarget: Object = new target();

  constructors.forEach(
    constructor => (constructoredTarget = Object.assign(constructoredTarget, new constructor())),
  );

  return constructoredTarget as T;
}

class Born {
  constructor(public location: string = 'iran', public time: Date = new Date()) {}

  getLocation() {
    return this.location;
  }

  getTime() {
    return this.time;
  }
}

class Signup {
  constructor(public firstName: string = 'mohammad', public lastName: string = 'nowresideh') {}
}

applyMixins(Signup, [Born]);
applyProperties(Signup, [Born]);
