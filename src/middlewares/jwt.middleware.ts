import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from 'express';

export class JwtMiddleware implements ExpressMiddlewareInterface {

  public use(req: Request, res: Response, next: NextFunction) {
    
  }
}