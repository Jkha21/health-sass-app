import express, { IRouter } from 'express';
const router = express.Router();

import authRoute from './user.route.js';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  // Authentication domain routes (Handles /auth/login and /auth/.well-known/jwks.json)
  router.use('/auth', new authRoute().getRoutes());

  return router;
};

export default routes;