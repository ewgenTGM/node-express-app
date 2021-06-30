import { UserType } from '../models/User';

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserType;
		}
	}
}
