import { createAction } from '@activepieces/pieces-framework';
import { createCustomApiCallAction } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { SERPKITE_API_URL } from '../common/client';

const baseAction = createCustomApiCallAction({
  auth: serpkiteAuth,
  baseUrl: () => SERPKITE_API_URL,
  authMapping: async (auth, propsValue) => {
    const url: unknown = propsValue['url']?.['url'];
    if (typeof url === 'string' && /^https?:\/\//i.test(url) && new URL(url).origin !== SERPKITE_API_URL) {
      throw new Error(`Custom API calls only go to ${SERPKITE_API_URL}.`);
    }
    if (propsValue['followRedirects'] === true) {
      throw new Error('Follow redirects is not supported: a redirect could carry your API key to another host.');
    }
    return { Authorization: `Bearer ${auth.secret_text}` };
  },
});

export const serpkiteCustomApiCallAction = createAction({
  auth: serpkiteAuth,
  name: 'custom_api_call',
  displayName: 'Custom API Call',
  description: 'Make a custom API call to a specific endpoint',
  props: baseAction.props,
  requireAuth: baseAction.requireAuth,
  errorHandlingOptions: baseAction.errorHandlingOptions,
  audience: 'human',
  classification: 'WRITE',
  aiMetadata: {
    description:
      'Sends an authenticated request to any SerpKite API path on https://api.serpkite.com (for example /v1/reviews, /v1/batches or /v1/monitors), for endpoints the other actions do not cover. Returns the HTTP status, headers and body. Not idempotent in general.',
    idempotent: false,
  },
  run: async (context) =>
    baseAction.run({
      ...context,
      propsValue: { ...context.propsValue, followRedirects: context.propsValue.followRedirects ?? false },
    }),
});
