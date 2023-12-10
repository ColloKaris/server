"use strict";
/**
 * Here we will define all those different decorators like
 * GET, POST, DELETE and all other different methods
 * we are going to put them inside this file the export them
 * for use in the rest of the project
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
// This is going to be a function decorator
//
require("reflect-metadata");
const Methods_1 = require("./Methods");
const MetadataKeys_1 = require("./MetadataKeys");
function routerBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            // Define some metadata on the target, at key, that says we are trying
            // to associate a path to our route in the future
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
/**
 * THE FOLLOWING CODE DESCRIBES GET,PUT, POST, DEL, PATCH decorators
 * List out all of the different methods that you want to build a decorator for
 * and use the routerBinder() method to make them
 */
exports.get = routerBinder(Methods_1.Methods.get);
exports.put = routerBinder(Methods_1.Methods.put);
exports.post = routerBinder(Methods_1.Methods.post);
exports.del = routerBinder(Methods_1.Methods.del);
exports.patch = routerBinder(Methods_1.Methods.patch);
