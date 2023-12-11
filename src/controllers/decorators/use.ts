import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

// THIS DECORATOR ALLOWS US TO ADD MIDDLEWARES TO OUR APPLICATION
// The use middleware will need to be called multiple times
export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    
    //commented the below line to use a more compacted syntax instead
    //middlewares.push(middleware); // add in the middleware passed to our decorator

    // Assign the middlwares array to the metadata object
    // [...middlewares, middleware] => says create a new array, take all the different values out of middlewares and add in then new
    // middleware that we want to throw in 
    Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key)
  };
}