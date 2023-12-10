import express from 'express';

/**
 * SETTING UP A SINGLETON IN TYPESCRIPT
 * The idea is to only ever have a single router in our application
 */

export class AppRouter {
  // private means that no code outside of this class can ever access this property
  private static instance: express.Router;

  // if it is the first time calling this method, we will create a
  // router and assign it to instance
  // you could use a getter here - just that Steve doesn't
  static getInstance(): express.Router {
    /** Here we are going to check if we have any instance available
     * If we do, we are going to return it automatically right away
     * Otherwise, we are going to create an instance and return it
     */
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }

}