export interface Hashtag {
  name: string;
  count: number;
}

export interface HashtagQueryParams {
  like?: string;
  limit?: number;
  greaterThan?: string;
  orderBy?: string;
}
