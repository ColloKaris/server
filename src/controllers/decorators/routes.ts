/**
 * Here we will define all those different decorators like
 * GET, POST, DELETE and all other different methods
 * we are going to put them inside this file the export them
 * for use in the rest of the project
 * */

// This is going to be a function decorator
//
import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express'

interface RouteHandlerDescriptor extends PropertyDescriptor {
  // value is an optional property in PropertyDescriptor
  // so you have to mark it as optional too when overriding it
  value?: RequestHandler
}

function routerBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      // Define some metadata on the target, at key, that says we are trying
      // to associate a path to our route in the future
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method , method, target, key);
    };
  };
}

/**
 * THE FOLLOWING CODE DESCRIBES GET,PUT, POST, DEL, PATCH decorators
 * List out all of the different methods that you want to build a decorator for
 * and use the routerBinder() method to make them
 */

export const get = routerBinder(Methods.get);
export const put = routerBinder(Methods.put);
export const post = routerBinder(Methods.post);
export const del = routerBinder(Methods.del);
export const patch = routerBinder(Methods.patch);
