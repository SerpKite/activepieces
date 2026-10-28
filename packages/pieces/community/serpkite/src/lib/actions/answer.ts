import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi, SLOW_TIMEOUT_MS } from '../common/client';
import { commonProps, PRICING_NOTE } from '../common/props';

export const answerAction = createAction({
  auth: serpkiteAuth,
  name: 'answer',
  displayName: 'Answer with Citations',
  description: `Answer a question from live Google results with numbered citations. Fast answers from the results page; Standard also reads the top pages. A failed answer is not billed. ${PRICING_NOTE}`,
  classification: 'READ',
  audience: 'both',
  aiMetadata: {
    description:
      'Answers a question from live Google results and returns a short answer with numbered citations and the sources it used. Depth fast answers from the results page; standard (default) also reads the top pages for a better-grounded answer. Read-only.',
    idempotent: true,
  },
  props: {
    q: Property.LongText({ displayName: 'Question', required: true }),
    depth: Property.StaticDropdown({
      displayName: 'Depth',
      description: 'Fast answers from the results page; Standard also reads the top pages.',
      required: false,
      defaultValue: 'standard',
      options: {
        options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Fast', value: 'fast' },
        ],
      },
    }),
    num_sources: Property.Number({
      displayName: 'Pages to Read',
      description: 'Pages read with Standard depth, 1 to 5 (default 3).',
      required: false,
    }),
    country: commonProps.country(),
    language: commonProps.language(),
    time: commonProps.time(),
    include_domains: commonProps.includeDomains(),
    exclude_domains: commonProps.excludeDomains(),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/answer',
      body: {
        q: p.q,
        depth: p.depth,
        num_sources: p.depth === 'fast' ? undefined : p.num_sources,
        country: p.country,
        language: p.language,
        time: p.time,
        include_domains: serpkiteApi.list(p.include_domains),
        exclude_domains: serpkiteApi.list(p.exclude_domains),
      },
      timeout: SLOW_TIMEOUT_MS,
    });
  },
});
