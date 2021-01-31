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
    password: String,
  },
  { timestamps: true },
);

// TODO : Implement password hashing

/*
UsersSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password,
        salt, null, (error, hash) => {
          if (error) {
            return next(error);
          }
          this.password = hash;
          return next(null, this);
        });
    });
  }
  return next(null, this);
});

UsersSchema.methods.comparePasswords = (candidatePassword, next) => {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  });
};

UsersSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UsersSchema.methods.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UsersSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.local.password;
    return ret;
  }
});
*/

export const Users = mongoose.model('Users', UsersSchema);
