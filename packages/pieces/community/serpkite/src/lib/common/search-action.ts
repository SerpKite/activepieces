import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from './client';
import { commonProps, PRICING_NOTE, wrapMarkdown } from './props';

type Extra = 'location' | 'time' | 'domains' | 'page';

/** One action per Google vertical: a query plus the options that vertical takes. */
export function createSearchAction({
  name,
  displayName,
  description,
  aiDescription,
  path,
  extras,
}: {
  name: string;
  displayName: string;
  description: string;
  aiDescription: string;
  path: string;
  extras: Extra[];
}) {
  const has = (e: Extra) => extras.includes(e);
  return createAction({
    auth: serpkiteAuth,
    name,
    displayName,
    description: `${description} ${PRICING_NOTE}`,
    classification: 'SEARCH',
    audience: 'both',
    aiMetadata: { description: aiDescription, idempotent: true },
    props: {
      q: Property.ShortText({ displayName: 'Query', description: 'What to search for.', required: true }),
      country: commonProps.country(),
      language: commonProps.language(),
      ...(has('location') ? { location: commonProps.location() } : {}),
      ...(has('time') ? { time: commonProps.time() } : {}),
      ...(has('domains') ? { include_domains: commonProps.includeDomains(), exclude_domains: commonProps.excludeDomains() } : {}),
      ...(has('page') ? { page: commonProps.page() } : {}),
      format: commonProps.format(),
    },
    async run({ auth, propsValue }) {
      const p = propsValue as Record<string, unknown>;
      const body = await serpkiteApi.request({
        apiKey: auth.secret_text,
        method: HttpMethod.POST,
        path,
        body: {
          q: p['q'],
          country: p['country'],
          language: p['language'],
          location: p['location'],
          time: p['time'],
          include_domains: serpkiteApi.list(p['include_domains']),
          exclude_domains: serpkiteApi.list(p['exclude_domains']),
          page: p['page'],
          format: p['format'],
        },
      });
      return wrapMarkdown(p['format'] as string | undefined, body);
    },
  });
}
