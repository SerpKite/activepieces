import { createSearchAction } from '../common/search-action';

export const shoppingAction = createSearchAction({
  name: 'search_shopping',
  displayName: 'Search Google Shopping',
  path: '/v1/shopping',
  extras: ['location', 'time', 'page'],
  description: 'Search Google Shopping: products with prices, merchants and ratings.',
  aiDescription:
    'Searches Google Shopping for products and returns title, price, merchant, rating and link. Use for price checks and product research. Read-only.',
});
