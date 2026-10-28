import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from '../common/client';
import { commonProps, PRICING_NOTE } from '../common/props';

export const placeAction = createAction({
  auth: serpkiteAuth,
  name: 'get_place',
  displayName: 'Get Place Details',
  description: `Get one Google Maps place by its place_id (or cid) from Search Google Maps: address, opening hours, website, phone, rating and photos. Not billed when no place matches. ${PRICING_NOTE}`,
  classification: 'READ',
  audience: 'both',
  aiMetadata: {
    description:
      'Returns the full Google Maps listing of one place by the place_id or cid from a Search Google Maps result: address, coordinates, time zone, categories, opening hours per weekday, website, phone, rating, description and photos. Read-only.',
    idempotent: true,
  },
  props: {
    place_id: Property.ShortText({
      displayName: 'Place ID',
      description: 'Google place id ("ChIJ…") from a Search Google Maps result.',
      required: false,
    }),
    cid: Property.ShortText({
      displayName: 'CID',
      description: 'Decimal customer id from a Search Google Maps result, instead of Place ID.',
      required: false,
    }),
    country: commonProps.country(),
    language: commonProps.language(),
  },
  async run({ auth, propsValue }) {
    if (!propsValue.place_id && !propsValue.cid) {
      throw new Error('Set Place ID or CID.');
    }
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/place',
      body: {
        place_id: propsValue.place_id,
        cid: propsValue.cid,
        country: propsValue.country,
        language: propsValue.language,
      },
    });
  },
});
