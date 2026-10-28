import { createSearchAction } from '../common/search-action';

export const mapsAction = createSearchAction({
  name: 'search_maps',
  displayName: 'Search Google Maps',
  path: '/v1/maps',
  extras: ['location', 'page'],
  description: 'Find places on Google Maps: name, rating, category, address, phone, website, place_id and coordinates. Put the area in Location or in the query.',
  aiDescription:
    'Finds places on Google Maps for a query such as "coffee roasters in Berlin" and returns name, rating, review count, category, address, phone, website, place_id and coordinates. Use Get Place Details with a place_id for opening hours and the full listing. Read-only.',
});
