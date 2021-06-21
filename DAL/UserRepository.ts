import {UserType} from '../models/userModel';
import {v1} from 'uuid';

type AddUserModelType = {
  name: string
  age: number
  email: string
}

type UpdateUserModelType = Partial<AddUserModelType>

interface IUserRepository {
  users: Array<UserType>
  getUserById: (id: string) => UserType | null
  getAllUsers: () => Array<UserType> | null
  addUser: (user: AddUserModelType) => UserType | null
  updateUser: (id: string, user: UpdateUserModelType) => UserType | null

}

const userRepository :IUserRepository = {
  users: [
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
  ]
  ,

  addUser(user) {
    const candidate = {id: v1(), ...user};
    this.users.push(candidate);
    return candidate;
  },

  getAllUsers() {
    return this.users;
  },

  getUserById(id) {
    const candidate = this.users.find(user => user.id === id);
    return candidate || null;
  },

  updateUser(id, user) {
    let candidate = this.users.find(user => user.id === id);
    if (candidate) {
      candidate = {...candidate, ...user};
    }
    return null;
  }
}