import { Class, Symboles } from './types';

export function Form() {
  return function (target: Class) {
    const object = new target();

    for (const key in object) {
      const inputInfo = Reflect.getMetadata(Symboles.INPUT, target.prototype, key);

      if (inputInfo) {
        // @ts-ignore
        object[key] = inputInfo;
      }
    }

    Reflect.defineMetadata(Symboles.FORM, object, target.prototype);
  };
}

export function getInput(target: any, name: string) {
  return Reflect.getMetadata(Symboles.INPUT, target, name) || {};
}

export function Value(defaultValue?: any) {
  return function (target: any, name: string) {
    const value = Reflect.getMetadata('design:type', target, name);
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, value: defaultValue || value(), type: value }, target, name);
  };
}

export function IsValid(isValid: boolean) {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, isValid }, target, name);
  };
}

export function Error(error: string = '') {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, defaultError: error, error: '' }, target, name);
  };
}

export function Validator(validator: Function) {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, validator }, target, name);
  };
}

export function BeforeSubmit() {
  return function (target: any, name: string) {
    Reflect.defineMetadata(Symboles.BEFORE, target[name], target);
  };
}

export function AfterSubmit() {
  return function (target: any, name: string) {
    Reflect.defineMetadata(Symboles.AFTER, target[name], target);
  };
}
