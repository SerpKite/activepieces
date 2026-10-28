import { createAction } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from '../common/client';

export const getAccountAction = createAction({
  auth: serpkiteAuth,
  name: 'get_account',
  displayName: 'Get Account Balance',
  description: "Get the account's credit balance, rate limit and this month's usage. Free.",
  classification: 'READ',
  audience: 'both',
  aiMetadata: { description: 'Returns the SerpKite credit balance, plan, rate limit and this month\'s credits and requests for the connected key. Read-only.', idempotent: true },
  props: {},
  async run({ auth }) {
    return serpkiteApi.request({ apiKey: auth.secret_text, method: HttpMethod.GET, path: '/v1/account' });
  },
});
