import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from '../common/client';
import { PRICING_NOTE } from '../common/props';

export const mapSiteAction = createAction({
  auth: serpkiteAuth,
  name: 'map_site',
  displayName: 'Map a Website',
  description: `List a website's URLs from its sitemaps and the start page's links, optionally ranked by a search phrase. Not billed when nothing is found. ${PRICING_NOTE}`,
  classification: 'READ',
  audience: 'both',
  aiMetadata: {
    description:
      "Lists a website's URLs (sitemaps plus the start page's links), optionally filtered and ranked by search words. Use to find the right pages on a site before reading them with Extract Pages. Read-only.",
    idempotent: true,
  },
  props: {
    url: Property.ShortText({ displayName: 'URL', description: 'Any page of the site.', required: true }),
    search: Property.ShortText({
      displayName: 'Search',
      description: 'Keep only URLs relevant to these words, most relevant first.',
      required: false,
    }),
    limit: Property.Number({ displayName: 'Limit', description: 'Maximum URLs (1 to 5,000; default 100).', required: false }),
    include_paths: Property.Array({
      displayName: 'Include Paths',
      description: 'Regular expressions; keep only URL paths matching one, e.g. ^/docs/.',
      required: false,
    }),
    exclude_paths: Property.Array({
      displayName: 'Exclude Paths',
      description: 'Regular expressions; drop URL paths matching one.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/map',
      body: {
        url: p.url,
        search: p.search,
        limit: p.limit,
        include_paths: serpkiteApi.list(p.include_paths),
        exclude_paths: serpkiteApi.list(p.exclude_paths),
      },
    });
  },
});
