import { PostCreationParams } from '../types/posts';
import { PostCreationParamsFactory } from './post.creation.params.factory';

export class PostsFactory {
  public makeCreationParams(): PostCreationParams {
    return PostCreationParamsFactory.make();
  }
}
