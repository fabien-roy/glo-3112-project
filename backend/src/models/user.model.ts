import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    // profilePicture: { type: String, required: false },
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
