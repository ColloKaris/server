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

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    for (let key of Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor')) {
      const routeHandler = target.prototype[key];

      // look for the path property that we put together in the other decorator
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method:Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key)

      // associate it with a router - but we don't have a router inside this file
      // we need to import express, create a router, associate all these different routes with it
      // then eventually export it and associate it with our index.ts app

      // Since not all functions in the, check that they are route handlers
      // if they have a path property
      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler)
      }
    }
  }
}