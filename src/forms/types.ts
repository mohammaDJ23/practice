export type Input = {
  [key: string]: {
    value: any;
    isValid: boolean;
    error: string;
  };
};

export interface Form {
  inputs: Input;
  isFormValid: boolean;
}

export type ClassForm = {
  new (...args: any[]): Form;
};

export type InputValues = {
  [key: string]: any;
};
