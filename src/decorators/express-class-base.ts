import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { MetadataKeyes, Methods } from './types';

class Express {
  private static _instance: express.Router;

  static instance(): express.Router {
    if (!Express._instance) {
      Express._instance = express.Router();
    }

    return Express._instance;
  }
}

function bodyValidator(keys: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return res.status(422).send({ message: 'Invalid request' });
    }

    for (const key of keys) {
      if (!req.body[key]) {
        return res.status(422).send({ message: 'Invalid request' });
      }
    }

    next();
  };
}

function Controller(prefixPath: string = '') {
  return function (target: Function) {
    const router = Express.instance();

    for (const key of Object.getOwnPropertyNames(target.prototype)) {
      const path = Reflect.getMetadata(MetadataKeyes.PATH, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeyes.METHOD, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeyes.MIDDLEWARE, target.prototype, key) || [];
      const validation = Reflect.getMetadata(MetadataKeyes.VALIDATIONS, target.prototype, key) || [];
      const validator = bodyValidator(validation);
      const routerHandler = target.prototype[key];

      if (!path || !method) {
        continue;
      }

      router[method](prefixPath + path, ...middlewares, validator, routerHandler);
    }
  };
}

function routerBinder(method: string) {
  return function (path: string) {
    return function (target: any, name: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeyes.PATH, path, target, name);
      Reflect.defineMetadata(MetadataKeyes.METHOD, method, target, name);
    };
  };
}

const Get = routerBinder(Methods.GET);
const Post = routerBinder(Methods.POST);

function Validator(...arr: string[]) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeyes.VALIDATIONS, arr, target, name);
  };
}

function Use(middleware: RequestHandler) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeyes.MIDDLEWARE, target, name) || [];
    Reflect.defineMetadata(MetadataKeyes.MIDDLEWARE, [...middlewares, middleware], target, name);
  };
}

function Logger(req: Request, res: Response, next: NextFunction) {
  next();
}

function Auth(req: Request, res: Response, next: NextFunction) {
  next();
}

@Controller()
class Authentication {
  @Get('/user')
  @Use(Logger)
  @Use(Auth)
  @Validator('id')
  getUser(req: Request, res: Response) {
    return {
      name: 'Mohammad',
      email: 'Mohammad.test@gmail.com',
    };
  }

  @Get('/users')
  @Use(Logger)
  @Use(Auth)
  getUsers(req: Request, res: Response) {
    return [
      {
        name: 'Mohammad',
        email: 'Mohammad.test@gmail.com',
      },
    ];
  }

  @Post('/create')
  @Use(Logger)
  @Validator('email', 'password', 'name')
  create(req: Request, res: Response) {
    return {
      createdAt: new Date(),
    };
  }

  @Post('/signin')
  @Use(Logger)
  @Validator('email', 'password')
  signin(req: Request, res: Response) {
    return {
      createdAt: new Date(),
    };
  }
}
