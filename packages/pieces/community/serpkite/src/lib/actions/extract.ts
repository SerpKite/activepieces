import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi, SLOW_TIMEOUT_MS } from '../common/client';
import { PRICING_NOTE } from '../common/props';

export const extractAction = createAction({
  auth: serpkiteAuth,
  name: 'extract',
  displayName: 'Extract Pages',
  description: `Read up to 20 URLs as Markdown. Optionally keep only the passages relevant to a query, add an AI summary of each page, or return each page's data as JSON matching your schema. Failed URLs and failed AI steps are not billed. ${PRICING_NOTE}`,
  classification: 'READ',
  audience: 'both',
  aiMetadata: {
    description:
      'Reads up to 20 URLs (HTML or PDF) as clean Markdown. With Query and Highlights it returns only the passages most relevant to the query; Summary adds a short summary per page; Output Schema returns structured JSON per page. Use to pull facts or fields out of known pages. Read-only.',
    idempotent: true,
  },
  props: {
    urls: Property.Array({ displayName: 'URLs', description: 'Up to 20 pages or PDFs.', required: true }),
    query: Property.ShortText({
      displayName: 'Query',
      description: 'What to rank passages against (used with Highlights, and focuses Summary).',
      required: false,
    }),
    highlights: Property.Number({
      displayName: 'Highlights',
      description: 'Passages per page ranked against Query, 0 to 10 (0 = the whole page).',
      required: false,
    }),
    max_tokens: Property.Number({
      displayName: 'Max Tokens per Page',
      description: 'Trim each page to about this many tokens (100 to 100,000).',
      required: false,
    }),
    summary: Property.Checkbox({
      displayName: 'Summary',
      description: 'Add a 3-6 sentence AI summary of each page (billed per page).',
      required: false,
      defaultValue: false,
    }),
    output_schema: Property.Json({
      displayName: 'Output Schema',
      description: 'A JSON Schema; each page\'s data is returned as JSON matching it in `output` (billed per page).',
      required: false,
    }),
    prompt: Property.LongText({
      displayName: 'Extraction Instructions',
      description: 'Guides Output Schema extraction: what to pick and how to normalise it.',
      required: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      description: 'Fetch as a visitor from this country, e.g. de.',
      required: false,
    }),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    const schema = p.output_schema && Object.keys(p.output_schema).length > 0 ? p.output_schema : undefined;
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/extract',
      body: {
        urls: serpkiteApi.list(p.urls),
        query: p.query,
        highlights: p.highlights,
        max_tokens: p.max_tokens,
        summary: p.summary || undefined,
        output_schema: schema,
        prompt: schema ? p.prompt : undefined,
        country: p.country,
      },
      timeout: SLOW_TIMEOUT_MS,
    });
  },
});
