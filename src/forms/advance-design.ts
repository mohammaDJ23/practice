interface Class {
  new (...args: any[]): {};
}

interface InputInfo<T = any> {
  value: T;
  isValid: boolean;
  validator: Function;
  defaultError: string;
  error: string;
}

interface Input {
  [key: string]: InputInfo;
}

type FormType<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : InputInfo<T[K]>;
};

enum Symboles {
  INPUT = 'INPUT',
  FORM = 'FORM',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

function Form() {
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

function getInput(target: any, name: string) {
  return Reflect.getMetadata(Symboles.INPUT, target, name) || {};
}

function value() {
  return function (target: any, name: string) {
    const value = Reflect.getMetadata('design:type', target, name);
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, value: value() }, target, name);
  };
}

function isValid(isValid: boolean) {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, isValid }, target, name);
  };
}

function error(error: string = '') {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, defaultError: error, error: '' }, target, name);
  };
}

function validator(validator: Function) {
  return function (target: any, name: string) {
    const input = getInput(target, name);
    Reflect.defineMetadata(Symboles.INPUT, { ...input, validator }, target, name);
  };
}

function BeforeSubmit() {
  return function (target: any, name: string) {
    Reflect.defineMetadata(Symboles.BEFORE, target[name], target);
  };
}

function AfterSubmit() {
  return function (target: any, name: string) {
    Reflect.defineMetadata(Symboles.AFTER, target[name], target);
  };
}

function isTextLengthValid(value: string) {
  return value.length;
}

function isArrayLengthValid(value: Array<any>) {
  return value.length;
}

@Form()
class Signin {
  @value()
  @isValid(false)
  @error('Please insert an valid email.')
  @validator(isTextLengthValid)
  email: string;

  @value()
  @isValid(false)
  @error('Please insert a valid password')
  @validator(isTextLengthValid)
  password: string;

  @BeforeSubmit()
  before(state: Input, form: FormType<Signin>) {}

  @AfterSubmit()
  after(state: Input, form: FormType<Signin>) {}
}

async function submit<T extends Function>(form: T) {
  const state = {};
  const formInfo: {} = Reflect.getMetadata(Symboles.FORM, form.prototype) || {};
  const beforeSubmit: Function = Reflect.getMetadata(Symboles.BEFORE, form.prototype) || function () {};
  const afterSubmit: Function = Reflect.getMetadata(Symboles.AFTER, form.prototype) || function () {};
  const beforeData: any = beforeSubmit(state, formInfo);
  const data: {} = await Promise.resolve({});
  const afterData: any = afterSubmit(state, formInfo);
}

submit(Signin);
