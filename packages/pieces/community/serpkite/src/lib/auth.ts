import { PieceAuth } from '@activepieces/pieces-framework';
import { AuthenticationType, httpClient, HttpMethod } from '@activepieces/pieces-common';
import { SERPKITE_API_URL } from './common/client';

const markdownDescription = `
To get your SerpKite API key:

1. Sign up at [serpkite.com](https://serpkite.com) (no card needed).
2. Open **API keys** in the [dashboard](https://app.serpkite.com) and create a key.
3. Paste the key (it starts with \`skt_live_\`) here.

Checking the key is free. Prices per request are on [serpkite.com/pricing](https://serpkite.com/pricing); failed and empty requests aren't billed.
`;

export const serpkiteAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: markdownDescription,
  required: true,
  validate: async ({ auth }) => {
    try {
      await httpClient.sendRequest({
        method: HttpMethod.GET,
        url: `${SERPKITE_API_URL}/v1/account`,
        authentication: { type: AuthenticationType.BEARER_TOKEN, token: auth },
      });
      return { valid: true };
    } catch {
      return { valid: false, error: 'Invalid SerpKite API key.' };
    }
  },
});
