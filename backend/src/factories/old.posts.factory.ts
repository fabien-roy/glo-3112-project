import { PostCreationParams } from '../types/posts';
import { PostCreationParamsFactory } from './post.creation.params.factory';

export class OldPostsFactory {
  public makeCreationParams(): PostCreationParams {
    return PostCreationParamsFactory.make();
  }
}
