import mongoose, { Schema } from 'mongoose';
// const bcrypt = require('bcrypt-nodejs');

const UsersSchema: Schema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      $match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      $match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      $match: [
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        'is invalid',
      ],
    },
    firstName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z]+$/, 'is invalid'],
    },
    lastName: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z]+$/, 'is invalid'],
    },
    description: String,
    avatarReference: String,
  },
  { timestamps: true },
);

export const Users = mongoose.model('Users', UsersSchema);
