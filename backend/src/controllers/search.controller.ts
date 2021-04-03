import { Controller, Request, Get, Route, SuccessResponse, Query } from 'tsoa';

import { validateAuthentication } from './authorization';
import { SearchResults } from '../types/search.results';
import { SearchService } from '../services/search.service';

@Route('search')
export class SearchController extends Controller {
  private searchService = new SearchService();
  private readonly SEARCH_LIMIT = 21;

  @Get()
  @SuccessResponse('200, OK')
  public async getSearch(
    @Request() req: any,
    @Query() value = '',
    @Query() limit = this.SEARCH_LIMIT,
  ): Promise<SearchResults> {
    validateAuthentication(req.user);
    return Promise.resolve(this.searchService.search(value, limit)).then(
      (searchResults: SearchResults) => {
        this.setStatus(200);
        return searchResults;
      },
      (err) => {
        throw err;
      },
    );
  }
}
