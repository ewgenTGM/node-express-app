import {model, Schema} from 'mongoose';
import {UserType} from './userModel';

const schema = new Schema<UserType>({
  name: {type: String, require: false},
  email: {type: String, require: true},
  age: {type: Number, require: false}
});

export const User = model<UserType>('user', schema);