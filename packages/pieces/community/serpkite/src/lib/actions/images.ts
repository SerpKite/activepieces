import { createSearchAction } from '../common/search-action';

export const imagesAction = createSearchAction({
  name: 'search_images',
  displayName: 'Search Google Images',
  path: '/v1/images',
  extras: ['location', 'time', 'domains', 'page'],
  description: 'Search Google Images: image URL, size, title and source page (up to 100 per page).',
  aiDescription:
    'Searches Google Images and returns image URL, thumbnail, size, title and source page, up to 100 per page. Read-only.',
});
