import { createSearchAction } from '../common/search-action';

export const autocompleteAction = createSearchAction({
  name: 'get_autocomplete',
  displayName: 'Get Google Autocomplete',
  path: '/v1/autocomplete',
  extras: [],
  description: 'Get the query suggestions Google shows while typing.',
  aiDescription:
    'Returns the query suggestions Google autocomplete shows for a partial query. Use for keyword ideas. Read-only.',
});
