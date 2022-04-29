import { Injector, Injectable } from './injector';

@Injectable()
class Face {
  log() {
    console.log('Log from face');
  }
}

@Injectable()
class Head {
  constructor(public face: Face) {}

  log() {
    console.log('Log from head');
  }
}

@Injectable()
class Body {
  constructor(public head: Head, public face: Face) {}
}

const body = Injector.resolve(Body);

body.head.log();
body.face.log();
