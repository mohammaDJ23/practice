import { Form, Value, IsValid, Error, Validator, BeforeSubmit, AfterSubmit } from './decorators';
import { FormType } from './types';
import { isTextLengthValid } from './validations';

@Form()
export class Signin {
  @Value()
  @IsValid(false)
  @Error('Please insert an valid email.')
  @Validator(isTextLengthValid)
  email: string;

  @Value()
  @IsValid(false)
  @Error('Please insert a valid password')
  @Validator(isTextLengthValid)
  password: string;

  @BeforeSubmit()
  before(state: FormType<Signin>) {}

  @AfterSubmit()
  after(state: FormType<Signin>) {}
}
