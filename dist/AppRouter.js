"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = __importDefault(require("express"));
/**
 * SETTING UP A SINGLETON IN TYPESCRIPT
 * The idea is to only ever have a single router in our application
 */
class AppRouter {
    // if it is the first time calling this method, we will create a
    // router and assign it to instance
    // you could use a getter here - just that Steve doesn't
    static getInstance() {
        /** Here we are going to check if we have any instance available
         * If we do, we are going to return it automatically right away
         * Otherwise, we are going to create an instance and return it
         */
        if (!AppRouter.instance) {
            AppRouter.instance = express_1.default.Router();
        }
        return AppRouter.instance;
    }
}
exports.AppRouter = AppRouter;
