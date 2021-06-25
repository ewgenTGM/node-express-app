import {Request, Response} from 'express';
import {ResponseModel} from '../models/ResponseModel';
import {validationResult} from 'express-validator';
import {User, UserType} from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

type TokenPayloadType = {
    id: string
    email: string
}

function generateAccessToken(id: string, email: string) {
    const payload: TokenPayloadType = {id, email};
    return jwt.sign(payload, config.get('SECRET_KEY'), {expiresIn: '24h'});
}

class AuthController {
    async register(req: Request, res: Response) {
        const response = new ResponseModel<any>();
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                errors.array().forEach(error => response.errors.push(error.msg));
                response.success = false;
                return res.status(400).json(response);
            }
            const {email, password} = req.body;
            if (await User.findOne({email})) {
                response.success = false;
                response.errors.push(`User ${email} already exist`);
                return res.status(400).json(response);
            }
            const hash = await bcrypt.hash(password, 6);
            const user = new User({email: email, password: hash});
            await user.save();
            response.messages.push(`User ${email} created`);
            res.status(200).json(response);

        } catch (e) {
            response.errors.push(e.message);
            res.status(400).json(response);
        }
    }

    async login(req: Request, res: Response) {
        const response = new ResponseModel<{token: string}>();
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                response.success = false;
                response.errors.push(`Неверный пользователь и (или) пароль`);
                return res.status(400).json(response);
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                response.success = false;
                response.errors.push(`Неверный пользователь и (или) пароль`);
                return res.status(400).json(response);
            }
            const token = generateAccessToken(user._id, user.email);
            response.data = {token};
            response.messages.push('Login success');
            res.json(response);
        } catch (e) {
            response.errors.push(e.message);
            res.status(400).json(response);
        }
    }

    async me(req: Request, res: Response) {
        const response = new ResponseModel<UserType>();
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                response.messages.push('No auth token');
                response.success = false;
                return res.json(response);
            }
            console.log(await jwt.decode(token));
        } catch (e) {
            response.errors.push(e.message);
            res.status(400).json(response);
        }
    }

    async logout(req: Request, res: Response) {
        const response = new ResponseModel<any>();
        try {

        } catch (e) {
            response.errors.push(e.message);
            res.status(400).json(response);
        }
    }
}

export default new AuthController();