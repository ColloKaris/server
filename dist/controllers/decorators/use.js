"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
// The use middleware will need to be called multiple times
function use(middleware) {
    return function (target, key, desc) {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target, key) || [];
        //commented the below line to use a more compacted syntax instead
        //middlewares.push(middleware); // add in the middleware passed to our decorator
        // Assign the middlwares array to the metadata object
        // [...middlewares, middleware] => says create a new array, take all the different values out of middlewares and add in then new
        // middleware that we want to throw in 
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middleware, [...middlewares, middleware], target, key);
    };
}
exports.use = use;
