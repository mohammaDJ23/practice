import { Login } from './login';
import { Signup } from './signup';
import { InputValues, ClassForm, Form as FormType } from './types';

class TryCatch {
  public static validator(fn: (...args: any[]) => void) {
    const ref = this;

    return function (...args: any[]) {
      try {
        fn.apply(ref, args);

        return {
          error: '',
          isValid: true,
        };
      } catch (error) {
        return {
          error: (error as any).message as string,
          isValid: false,
        };
      }
    };
  }
}

class Validator {
  public static input(input: string, value: any) {
    switch (input) {
      case 'name':
        if (!value.length) {
          throw new Error('Invaild name.');
        }

        break;

      case 'email':
        break;

      case 'password':
        break;

      default:
        throw new Error('Invalid input.');
    }
  }

  public static form() {}
}

class Form {
  // initial form states

  private _forms: Map<string, FormType> = new Map();

  // initializing the forms

  setForms(forms: ClassForm[], counter: number = 1): void {
    if (!forms.length) {
      return;
    }

    if (this._forms.has(forms[0].name)) {
      this.setForms(forms, counter + 1);
      return;
    }

    const { inputs, isFormValid } = new forms[0]();
    this._forms.set(forms[0].name, { inputs, isFormValid });
    this.setForms(forms.slice(counter), counter + 1);
  }

  // get all forms

  get forms(): typeof this._forms {
    return this._forms;
  }

  // get specific form

  getForm(name: string): FormType {
    const form = this._forms.get(name);

    if (form) {
      return form;
    }

    throw new Error('Invalid form.');
  }

  // get the values of a form

  getValues(name: string): InputValues {
    const inputs = { ...this.getForm(name).inputs };

    for (let inputName in inputs) {
      inputs[inputName] = inputs[inputName].value;
    }

    return inputs;
  }

  // set a value

  setValue(form: string, input: string, value: any): void {
    const formInfo = this.getForm(form);

    if (formInfo.inputs[input]) {
      const { error, isValid } = TryCatch.validator(Validator.input)(input, value);

      formInfo.inputs[input].value = value;
      formInfo.inputs[input].isValid = isValid;
      formInfo.inputs[input].error = error;
    }

    let isFormValid = true;

    for (let input in formInfo.inputs) {
      isFormValid = isFormValid && formInfo.inputs[input].isValid;
    }

    formInfo.isFormValid = isFormValid;
  }
}
