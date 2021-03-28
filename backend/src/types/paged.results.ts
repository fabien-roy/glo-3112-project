export interface PagedResults<ResultType> {
  results: ResultType[];
  // TODO : Add firstKey
  // TODO : Add lastKey
  count: number;
}
