import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

// This is a factory decorator because we want to put in some list of
// strings to check for inside the request body
export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, dec: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key)
  }
}

