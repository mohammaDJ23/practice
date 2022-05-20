enum Symboles {
  VALUE = 'VALUE',
  IS_VALID = 'IS_VALID',
  ERROR = 'ERROR',
  VALIDATOR = 'VALIDATOR',
  FORM = 'FORM',
  REMOVE_VALUE = 'REMOVE_VALUE',
}

class Form {
  static instance() {
    return function (target: any) {
      const object = new target();

      for (const key in object) {
        object[key] = Reflect.getMetadata(Symboles.VALUE, target.prototype, key);
      }

      Reflect.defineMetadata(Symboles.FORM, Object.seal(object), target.prototype);
    };
  }
}

class Input {
  static value() {
    return function (target: any, name: string) {
      const value = Reflect.getMetadata('design:type', target, name);
      Reflect.defineMetadata(Symboles.VALUE, value(), target, name);
    };
  }

  static isValid(isValid: boolean) {
    return function (target: any, name: string) {
      Reflect.defineMetadata(Symboles.IS_VALID, isValid, target, name);
    };
  }

  static error(error: string = '') {
    return function (target: any, name: string) {
      Reflect.defineMetadata(Symboles.ERROR, { defaultError: error, error: '' }, target, name);
    };
  }

  static validator(validator: Function) {
    return function (target: any, name: string) {
      Reflect.defineMetadata(Symboles.VALIDATOR, validator, target, name);
    };
  }

  static getValue(target: Function, name: string) {
    return Reflect.getMetadata(Symboles.VALUE, target.prototype, name);
  }

  static getIsValid(target: Function, name: string) {
    return Reflect.getMetadata(Symboles.IS_VALID, target.prototype, name);
  }

  static getError(target: Function, name: string) {
    Reflect.getMetadata(Symboles.ERROR, target.prototype, name);
  }

  static getValidator(target: Function, name: string) {
    return Reflect.getMetadata(Symboles.VALIDATOR, target.prototype, name);
  }
}

class Validation {
  static isTextLengthValid(value: string) {
    return value.length;
  }

  static isArrayLengthValid(value: Array<any>) {
    return value.length;
  }
}

@Form.instance()
class Signin {
  @Input.value()
  @Input.isValid(false)
  @Input.error('Please insert an valid email.')
  @Input.validator(Validation.isTextLengthValid)
  email: string;

  @Input.value()
  @Input.isValid(false)
  @Input.error('Please insert a valid password')
  @Input.validator(Validation.isTextLengthValid)
  password: string;

  @Input.value()
  @Input.isValid(false)
  @Input.error('Please insert some name')
  @Input.validator(Validation.isArrayLengthValid)
  names: Array<any>;
}
