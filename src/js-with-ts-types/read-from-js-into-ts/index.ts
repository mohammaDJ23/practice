import { number, view } from './main';

type Num = typeof number;
type View = typeof view;

console.log(number, view(number));
