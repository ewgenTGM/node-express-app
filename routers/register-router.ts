import {Request, Response, Router} from 'express';
import {ResponseModel} from '../models/ResponseModel';
import {body, check, validationResult} from 'express-validator';
import {User} from '../models/User';
import {IUserRepository, UserRepositoryClass} from '../DAL/UserRepositoryClass';

export const registerRouter = Router();
const repository: IUserRepository = new UserRepositoryClass();

registerRouter.post('/',
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isLength({min: 8}).withMessage('Password must be longer that 8 chars'),
  register);

async function register(req: Request, res: Response) {
  const response = new ResponseModel<any>();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(error => response.errors.push(error.msg));
    response.success = false;
    res.status(400).json(response);
  }
  try {
    if (await User.findOne({email: req.body['email']})) {
      response.success = false;
      response.errors.push(`User with ${req.body['email']} exist`);
      res.status(400).json(response);
    } else {
      const user = await repository.addUser({...req.body});
      response.data = user;
      res.status(200).json(user);
    }
  } catch (e) {
    response.errors.push(e.message);
    res.status(400).json(response);
  }
}