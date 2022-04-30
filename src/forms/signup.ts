export class Signup {
  inputs = {
    name: {
      value: '',
      isValid: false,
      error: '',
    },

    email: {
      value: '',
      isValid: false,
      error: '',
    },

    password: {
      value: '',
      isValid: false,
      error: '',
    },
  };

  isFormValid = false;
}
