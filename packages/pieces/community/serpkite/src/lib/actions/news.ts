import { createSearchAction } from '../common/search-action';

export const newsAction = createSearchAction({
  name: 'search_news',
  displayName: 'Search Google News',
  path: '/v1/news',
  extras: ['location', 'time', 'domains', 'page'],
  description: 'Search Google News for recent articles: title, link, source, date and snippet.',
  aiDescription:
    'Searches Google News for recent articles about a query and returns title, link, source, date and snippet. Use for recent events and brand or topic monitoring; set Time Range to narrow to the past hour, day or week. Read-only.',
});
