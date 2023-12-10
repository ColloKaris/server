"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
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
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key of Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor')) {
            const routeHandler = target.prototype[key];
            // look for the path property that we put together in the other decorator
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            // associate it with a router - but we don't have a router inside this file
            // we need to import express, create a router, associate all these different routes with it
            // then eventually export it and associate it with our index.ts app
            // Since not all functions in the, check that they are route handlers
            // if they have a path property
            if (path) {
                router[method](`${routePrefix}${path}`, routeHandler);
            }
        }
    };
}
exports.controller = controller;
