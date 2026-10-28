import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi, SLOW_TIMEOUT_MS } from '../common/client';
import { commonProps, PRICING_NOTE, wrapMarkdown } from '../common/props';

export const searchAction = createAction({
  auth: serpkiteAuth,
  name: 'search',
  displayName: 'Search Google',
  description: `Search Google: organic results, answer box, knowledge graph, People Also Ask and related searches. ${PRICING_NOTE}`,
  classification: 'SEARCH',
  audience: 'both',
  aiMetadata: {
    description:
      'Searches Google for a query and returns the results page: organic results (title, link, snippet), answer box, knowledge graph, People Also Ask and related searches. Use for current facts and anything after a model cutoff. Optionally reads the top pages (Read Top Pages) and writes a short cited answer (Include Answer), both billed extra. Read-only.',
    idempotent: true,
  },
  props: {
    q: Property.ShortText({ displayName: 'Query', description: 'What to search for.', required: true }),
    country: commonProps.country(),
    language: commonProps.language(),
    location: commonProps.location(),
    num: Property.StaticDropdown({
      displayName: 'Results',
      description: 'How many results. More than 10 is billed as a deeper search (see pricing).',
      required: false,
      defaultValue: 10,
      options: {
        options: [10, 20, 30, 50, 100].map((n) => ({ label: String(n), value: n })),
      },
    }),
    page: commonProps.page(),
    time: commonProps.time(),
    include_domains: commonProps.includeDomains(),
    exclude_domains: commonProps.excludeDomains(),
    include_content: Property.Number({
      displayName: 'Read Top Pages',
      description: 'Also fetch the top N result pages (0 to 5) as Markdown. Billed per page read.',
      required: false,
    }),
    include_answer: Property.Checkbox({
      displayName: 'Include Answer',
      description: 'Add a short AI answer with numbered citations, written over these results. Not billed when it fails.',
      required: false,
      defaultValue: false,
    }),
    format: commonProps.format(),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    const body = await serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/search',
      body: {
        q: p.q,
        country: p.country,
        language: p.language,
        location: p.location,
        num: p.num,
        page: p.page,
        time: p.time,
        include_domains: serpkiteApi.list(p.include_domains),
        exclude_domains: serpkiteApi.list(p.exclude_domains),
        include_content: p.include_content || undefined,
        include_answer: p.include_answer || undefined,
        format: p.format,
      },
      timeout: p.include_answer || p.include_content ? SLOW_TIMEOUT_MS : undefined,
    });
    return wrapMarkdown(p.format, body);
  },
});
