import { createSearchAction } from '../common/search-action';

export const patentsAction = createSearchAction({
  name: 'search_patents',
  displayName: 'Search Google Patents',
  path: '/v1/patents',
  extras: ['page'],
  description: 'Search Google Patents: title, number, assignee, inventor and dates.',
  aiDescription:
    'Searches Google Patents and returns patent title, number, assignee, inventor, priority and publication dates and link. Read-only.',
});
