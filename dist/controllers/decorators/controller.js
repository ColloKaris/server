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
// function to automate the checking for us
function bodyValidators(keys) {
    // return a middleware that checks all keys are present
    return function (req, res, next) {
        // here we will look at req.body, make sure there is a body in the first place,
        // and look that all these keys exist inside there. If none of them don't we,
        // we immediately return the response with an error message
        // otherwise we call our next function
        if (!req.body) {
            res.status(422).send('Invalid Request');
            return; // return to prevent code after this from executing
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`Missing Property ${key}`);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key of Object.getOwnPropertyNames(target.prototype).filter(name => name !== 'constructor')) {
            const routeHandler = target.prototype[key];
            // look for the path property that we put together in the other decorator
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            // you need to handle the case of adding an event handler with no middleware
            // associated with it - we do this by adding || []
            const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) || [];
            // associate it with a router - but we don't have a router inside this file
            // we need to import express, create a router, associate all these different routes with it
            // then eventually export it and associate it with our index.ts app
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) || [];
            // pass array of keys into BodyValidators
            const validator = bodyValidators((requiredBodyProps));
            // actual route handler
            if (path) {
                // using the spread syntax becaus we are working with an array of middlewares
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    };
}
exports.controller = controller;
