import { User, UserType } from '../models/User';

export interface IUserRepository {
	getUserById: (id: string) => Promise<UserType | null>;
	getUserByEmail: (email: string) => Promise<UserType | null>;
	getAllUsers: () => Promise<Array<UserType> | null>;
	updateUser: (
		id: string,
		user: Partial<UserType>
	) => Promise<UserType | null>;
	deleteUser: (id: string) => Promise<boolean>;
}

export class UserRepositoryClass implements IUserRepository {
	constructor() {}

	async getUserByEmail(email: string) {
		try {
			const user = await User.findOne({ email });
			return user;
		} catch (e) {
			throw new Error(e.message);
		}
		return null;
	}

	async deleteUser(id: string) {
		try {
			await User.deleteOne({ _id: id });
			return true;
		} catch {
			return false;
		}
	}

	async getAllUsers() {
		const users = await User.find();
		return users || null;
	}

	async getUserById(id: string) {
		const candidate = await User.findById(id);
		return candidate || null;
	}

	async updateUser(id: string, user: Partial<UserType>) {
		try {
			const candidate = await User.findById(id);
			if (candidate) {
				const updatedUser = await candidate.update({ ...user });
				return candidate;
			}
			return null;
		} catch {
			return null;
		}
	}
}
