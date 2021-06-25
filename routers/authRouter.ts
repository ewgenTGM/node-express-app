import {Router} from 'express';
import {check} from 'express-validator';
import {IUserRepository, UserRepositoryClass} from '../DAL/UserRepositoryClass';
import authController from '../controllers/authController';

export const authRouter = Router();

authRouter.get('/me', authController.me);

authRouter.post('/register',
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Короткий пароль').isLength({min: 8}),
    authController.register);

authRouter.post('/login', authController.login);

authRouter.delete('/login', authController.logout);