import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from '../common/client';
import { commonProps, PRICING_NOTE, wrapMarkdown } from '../common/props';

export const webpageAction = createAction({
  auth: serpkiteAuth,
  name: 'fetch_webpage',
  displayName: 'Fetch Webpage',
  description: `Read a public URL (HTML page or PDF) as clean Markdown with its title, description and other metadata. ${PRICING_NOTE}`,
  classification: 'READ',
  audience: 'both',
  aiMetadata: {
    description:
      'Fetches one public URL (HTML or PDF) and returns its main content as clean Markdown plus metadata (title, description, language, published time, author). Use after a search to read a result. Read-only.',
    idempotent: true,
  },
  props: {
    url: Property.ShortText({ displayName: 'URL', description: 'An HTML page or a PDF.', required: true }),
    include_links: Property.Checkbox({
      displayName: 'Include Links',
      description: "Also return the page's outbound links.",
      required: false,
      defaultValue: false,
    }),
    include_images: Property.Checkbox({
      displayName: 'Include Images',
      description: "Also return the page's image URLs.",
      required: false,
      defaultValue: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      description: 'Fetch as a visitor from this country, e.g. de, for pages that differ by country.',
      required: false,
    }),
    format: commonProps.format(),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    const body = await serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/webpage',
      body: {
        url: p.url,
        include_links: p.include_links || undefined,
        include_images: p.include_images || undefined,
        country: p.country,
        format: p.format,
      },
    });
    return wrapMarkdown(p.format, body);
  },
});
