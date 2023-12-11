/**
 * The controller decorator will look at whatever class we are applying it to
 * itrate over all the different properties in its class prototype
 * and check if those methods have any decorators associated with them
 * If they do, it will take that metadata information and associate it will
 * some route
 * 
 * controller will take some route prefix. This prefix can be
 * applied to all the different routes defined in the LoginController class
 */
import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';


// function to automate the checking for us
function bodyValidators(keys: string[]): RequestHandler{
  // return a middleware that checks all keys are present
  return function(req: Request, res: Response, next: NextFunction){
    // here we will look at req.body, make sure there is a body in the first place,
    // and look that all these keys exist inside there. If none of them don't we,
    // we immediately return the response with an error message
    // otherwise we call our next function
    if (!req.body) {
      res.status(422).send('Invalid Request');
      return; // return to prevent code after this from executing
    }

    for (let key of keys) {
      if(!req.body[key]) {
        res.status(422).send(`Missing Property ${key}`);
        return;
      }
    }

    next();
  }
}

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    for (let key of Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor')) {
      const routeHandler = target.prototype[key];

      // look for the path property that we put together in the other decorator
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method:Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)
      
      // you need to handle the case of adding an event handler with no middleware
      // associated with it - we do this by adding || []
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

      // associate it with a router - but we don't have a router inside this file
      // we need to import express, create a router, associate all these different routes with it
      // then eventually export it and associate it with our index.ts app

      const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
      
      // pass array of keys into BodyValidators
      const validator = bodyValidators((requiredBodyProps))

      
      
      // Since not all functions in the, check that they are route handlers
      // if they have a path property
      ;
      // actual route handler
      if (path) {
        // using the spread syntax becaus we are working with an array of middlewares
        router[method](`${routePrefix}${path}`,...middlewares, validator, routeHandler)
      }
    }
  }
}