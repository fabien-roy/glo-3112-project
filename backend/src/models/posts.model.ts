import mongoose, { Schema, Document } from 'mongoose';
import { Reaction, SavedPost, UserComment } from '../types/posts';
import { FakeableDocument } from '../types/fakeable.document';

const ReactionsSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): Reaction {
        return {
          user: ret.user,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

const CommentsSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
    text: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): UserComment {
        return {
          user: ret.user,
          text: ret.text,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

const PostsSchema = new Schema(
  {
    reference: {
      type: String,
      required: [true, "can't be blank"],
    },
    description: String,
    hashtags: [{ type: String, lowercase: true }],
    usertags: [String],
    reactions: [ReactionsSchema],
    comments: [CommentsSchema],
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
          reactions: ret.reactions,
          comments: ret.comments,
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
