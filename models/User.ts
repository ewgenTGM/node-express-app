import {Model, model, Schema} from 'mongoose';

export type UserType = {
    email: string
    password: string
    name?: string
    age?: string
}

const schema = new Schema<UserType, Model<UserType>, UserType>({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: false},
    age: {type: String, required: false}

});

export const User = model<UserType>('User', schema);