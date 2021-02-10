import mongoose, { Schema, Document } from 'mongoose';
import { SavedPost } from '../types/posts';

// TODO : Find a way to test data validation
const PostsSchema = new Schema(
  {
    reference: {
      type: String,
      required: [true, "can't be blank"],
    },
    description: String,
    tags: [String],
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret): SavedPost {
        return {
          id: ret.id,
          reference: ret.reference,
          description: ret.description,
          tags: ret.tags,
          user: ret.user,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

export const Posts = mongoose.model<SavedPost & Document>('Posts', PostsSchema);
