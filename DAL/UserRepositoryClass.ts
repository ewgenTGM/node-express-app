import {UserType} from '../models/userModel';
import {v1} from 'uuid';
import {User} from '../models/User';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserType | null>
  getAllUsers: () => Promise<Array<UserType> | null>
  addUser: (user: UserType) => Promise<UserType | null>
  updateUser: (id: string, user: Partial<UserType>) => Promise<UserType | null>
  deleteUser: (id: string) => Promise<boolean>
}

export class UserRepositoryClass implements IUserRepository {
  constructor() {
  }

  async deleteUser(id: string) {
    try {
      await User.deleteOne({_id: id});
      return true;
    } catch {
      return false;
    }
  };

  async addUser(user: UserType) {
    if (await User.findOne({email: user.email})) {
      return null;
    }
    const newUser = new User({...user});
    try {
      await newUser.save();
      return newUser;
    } catch {
      return null;
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
        const updatedUser = await candidate.update({...user});
        return candidate;
      }
      return null;
    } catch {
      return null;
    }
  }
}