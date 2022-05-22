import { Symboles } from './types';
import { Signin } from './signin';
import { Signup } from './signup';

async function submit<T extends Function>(form: T) {
  const formInfo: {} = Reflect.getMetadata(Symboles.FORM, form.prototype) || {};
  const beforeSubmit: Function = Reflect.getMetadata(Symboles.BEFORE, form.prototype) || function () {};
  const afterSubmit: Function = Reflect.getMetadata(Symboles.AFTER, form.prototype) || function () {};
  const beforeData: any = beforeSubmit(formInfo);
  const data: {} = await Promise.resolve({});
  const afterData: any = afterSubmit(formInfo);
}

submit(Signin);
submit(Signup);
