import express, { Router, Request, Response } from 'express';

import { routeAdapter, middlewareAdapter } from '@/infra/http';
import { userRoutes, cartRoutes } from './';

const routes = express.Router();

export const renderRoutes = (): Router => {
  const rendered = [...userRoutes, ...cartRoutes];

  for (const route of rendered) {
    if (route.middleware) {
      routes[route.method](
        route.path,
        (req, res, next) => middlewareAdapter(req, res, next, route.middleware),
        (req: Request, res: Response) => routeAdapter(req, res, route.handler)
      );
    } else {
      routes[route.method](route.path, (req: Request, res: Response) =>
        routeAdapter(req, res, route.handler)
      );
    }
  }

  return routes;
};
