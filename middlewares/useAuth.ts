import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../controllers/authController';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import config from 'config';

function getTokenFromHeader(req: Request) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1];
	}
}

export default async function useAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = getTokenFromHeader(req);
		if (token) {
			const verify: any = jwt.verify(token, config.get('SECRET_KEY'));
			const user = await User.findById(verify.id);
			if (user) {
				//@ts-ignore
				req.currentUser = user;
				return next();
			}
		}
		res.status(401).json({ message: 'You are not authorized' });
	} catch (error) {
		res.status(401).json({ message: 'You are not authorized' });
	}
}
