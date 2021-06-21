import {UserType} from '../models/userModel';
import {v1} from 'uuid';

type AddUserModelType = {
  name: string
  age: number
  email: string
}

type UpdateUserModelType = Partial<AddUserModelType>

export interface IUserRepository {
  getUserById: (id: string) => UserType | null
  getAllUsers: () => Array<UserType> | null
  addUser: (user: AddUserModelType) => UserType | null
  updateUser: (id: string, user: UpdateUserModelType) => UserType | null
  deleteUser: (id: string) => boolean
}

export class FakeUserRepositoryClass implements IUserRepository {
  private users: Array<UserType>;

  constructor() {
    this.users = [
      {
        id: v1(), name: 'Alex', age: 15, email: 'mail01@mail.com'
      },
      {
        id: v1(), name: 'Eugene', age: 20, email: 'mail02@mail.com'
      },
      {
        id: v1(), name: 'Marina', age: 27, email: 'mail03@mail.com'
      },
      {
        id: v1(), name: 'Ivan', age: 8, email: 'mail04@mail.com'
      },
      {
        id: v1(), name: 'Daria', age: 14, email: 'mail05@mail.com'
      }
    ];
  }

  deleteUser(id: string): boolean {
    const candidate = this.users.findIndex(user => user.id === id);
    if (candidate) {
      this.users = this.users.filter(user => user.id !== id);
      return true;
    }
    return false;
  };

  addUser(user: AddUserModelType): UserType | null {
    const candidate = {id: v1(), ...user};
    this.users.push(candidate);
    return candidate;
  }

  getAllUsers(): Array<UserType> | null {
    return this.users;
  }

  getUserById(id: string): UserType | null {
    const candidate = this.users.find(user => user.id === id);
    return candidate || null;
  }

  updateUser(id: string, user: UpdateUserModelType): UserType | null {
    let candidate = this.users.find(user => user.id === id);
    if (candidate) {
      candidate = {...candidate, ...user};
      return candidate;
    }
    return null;
  }
}