import { createSearchAction } from '../common/search-action';

export const videosAction = createSearchAction({
  name: 'search_videos',
  displayName: 'Search Google Videos',
  path: '/v1/videos',
  extras: ['location', 'time', 'domains', 'page'],
  description: 'Search Google Videos: title, link, channel, duration and date.',
  aiDescription:
    'Searches Google Videos and returns title, link, channel, duration and date for each video. Read-only.',
});
