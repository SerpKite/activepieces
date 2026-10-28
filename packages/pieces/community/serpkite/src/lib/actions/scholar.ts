import { createSearchAction } from '../common/search-action';

export const scholarAction = createSearchAction({
  name: 'search_scholar',
  displayName: 'Search Google Scholar',
  path: '/v1/scholar',
  extras: ['page'],
  description: 'Search Google Scholar for academic papers with citations and PDF links.',
  aiDescription:
    'Searches Google Scholar for academic papers and returns title, authors, publication, year, citation count and PDF link. Read-only.',
});
