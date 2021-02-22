import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../types/users';

const UsersSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[\\.a-zA-Z0-9_-]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'],
      index: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        'is invalid',
      ],
    },
    firstName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/, 'is invalid'],
    },
    lastName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/, 'is invalid'],
    },
    description: String,
    avatarReference: String,
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret): User {
        return {
          username: ret.username,
          email: ret.email,
          phoneNumber: ret.phoneNumber,
          firstName: ret.firstName,
          lastName: ret.lastName,
          description: ret.description,
          avatarReference: ret.avatarReference,
        };
      },
    },
  },
);

export const Users = mongoose.model<User & Document>('Users', UsersSchema);
