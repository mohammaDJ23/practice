export interface Class {
  new (...args: any[]): {};
}

export interface InputInfo<T = any> {
  value: T;
  isValid: boolean;
  validator: Function;
  defaultError: string;
  error: string;
  type: Function;
}

export interface Input {
  [key: string]: InputInfo;
}

export type FormType<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : InputInfo<T[K]>;
};

export enum Symboles {
  INPUT = 'INPUT',
  FORM = 'FORM',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}
