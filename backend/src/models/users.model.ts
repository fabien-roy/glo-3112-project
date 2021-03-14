import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../types/users';

const UsersSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      index: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^.+@.+$/, 'is invalid'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      match: [
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}$/,
        'is invalid',
      ],
    },
    firstName: {
      type: String,
      required: [true, "can't be blank"],
    },
    lastName: {
      type: String,
    },
    description: String,
    avatarReference: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): User {
        return {
          username: ret.username,
          email: ret.email,
          phoneNumber: ret.phoneNumber,
          firstName: ret.firstName,
          lastName: ret.lastName,
          description: ret.description,
          avatarReference: ret.avatarReference,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

export const Users = mongoose.model<User & Document>('Users', UsersSchema);
