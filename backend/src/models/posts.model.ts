import mongoose, { Schema, Document } from 'mongoose';
import { SavedPost } from '../types/posts';
import { FakeableDocument } from '../types/fakeable.document';

const PostsSchema = new Schema(
  {
    reference: {
      type: String,
      required: [true, "can't be blank"],
    },
    description: String,
    hashtags: [String],
    usertags: [String],
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
    fake: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): SavedPost {
        return {
          id: ret._id,
          reference: ret.reference,
          description: ret.description,
          hashtags: ret.hashtags,
          usertags: ret.usertags,
          user: ret.user,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

export const Posts = mongoose.model<SavedPost & FakeableDocument & Document>(
  'Posts',
  PostsSchema,
);
