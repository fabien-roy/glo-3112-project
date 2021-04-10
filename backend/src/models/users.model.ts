import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../types/users';
import { FakeableDocument } from '../types/fakeable.document';
import { Posts } from './posts.model';
import { Notifications } from './notifications.model';

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
    notifiedAt: {
      type: Date,
      default: new Date(),
    },
    sessionToken: String,
    sessionEndTime: Date,
    fake: {
      type: Boolean,
      default: false,
    },
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
          notifiedAt: ret.notifiedAt,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

UsersSchema.pre<User & Document>(
  'deleteOne',
  { document: true },
  async function (next) {
    Posts.deleteMany({ user: this.username }).exec();
    Posts.updateMany({
      $pull: {
        usertags: this.username,
        reactions: { user: this.username },
        comments: { user: this.username },
      },
    }).exec();
    Notifications.deleteMany({
      $or: [{ recipient: this.username }, { user: this.username }],
    }).exec();
    next();
  },
);

export interface AuthUser {
  sessionToken: string;
  sessionEndTime: Date;
}

export const Users = mongoose.model<
  User & AuthUser & FakeableDocument & Document
>('Users', UsersSchema);
