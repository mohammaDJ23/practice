import { AfterSubmit, BeforeSubmit, Error, Form, IsValid, Validator, Value } from './decorators';
import { FormType } from './types';
import { isTextLengthValid } from './validations';

@Form()
export class Signup {
  @Value()
  @IsValid(false)
  @Error('Please insert a valid email')
  @Validator(isTextLengthValid)
  email: string;

  @Value()
  @IsValid(false)
  @Error('Please insert a valid password')
  @Validator(isTextLengthValid)
  password: string;

  @Value()
  @IsValid(false)
  @Error('Please insert a valid name')
  @Validator(isTextLengthValid)
  name: string;

  @Value()
  @IsValid(false)
  @Error('Please insert a valid lastname')
  @Validator(isTextLengthValid)
  lastName: string;

  @BeforeSubmit()
  before(state: FormType<Signup>) {}

  @AfterSubmit()
  after(state: FormType<Signup>) {}
}
