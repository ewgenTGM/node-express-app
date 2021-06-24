import {Request, Response, Router} from 'express';
import {ResponseModel} from '../models/ResponseModel';

const defaultRouter = Router();

defaultRouter.use(defaultRouteHandler);

function defaultRouteHandler(req: Request, res: Response) {
  const response = new ResponseModel<any>();
  response.success = false;
  response.errors.push('Bad URL');
  response.data = {
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body
  };
  res.status(404).json(response);
}

export default defaultRouter;