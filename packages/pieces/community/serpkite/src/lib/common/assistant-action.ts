import { createAction, Property } from '@activepieces/pieces-framework';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from './client';
import { commonProps, PRICING_NOTE, wrapMarkdown } from './props';

/** Ask a public AI assistant as a logged-out visitor: answer, cited sources, products and brand mentions. */
export function createAssistantAction({
  name,
  displayName,
  assistant,
  path,
  latency,
  aiDescription,
  webSearch = false,
  language = true,
}: {
  name: string;
  displayName: string;
  assistant: string;
  path: string;
  latency: string;
  aiDescription: string;
  webSearch?: boolean;
  language?: boolean;
}) {
  return createAction({
    auth: serpkiteAuth,
    name,
    displayName,
    description: `Ask ${assistant} and get its answer with the sources it cited. Answers usually take ${latency}. ${PRICING_NOTE}`,
    classification: 'READ',
    audience: 'both',
    aiMetadata: { description: aiDescription, idempotent: false },
    props: {
      prompt: Property.LongText({
        displayName: 'Prompt',
        description: `The message to ${assistant} (up to 4,000 characters).`,
        required: true,
      }),
      track: Property.Array({
        displayName: 'Track Brands or Domains',
        description: 'Brands or domains to check the answer for, e.g. "Sony" or "anker.com" (up to 20). Each gets a `mentions` entry: named in the text, cited or listed as a source or product.',
        required: false,
      }),
      ...(webSearch
        ? {
            web_search: Property.Checkbox({
              displayName: 'Search the Web',
              description: `Make ${assistant} search the web (default on). Off lets it decide.`,
              required: false,
              defaultValue: true,
            }),
          }
        : {}),
      country: Property.ShortText({
        displayName: 'Country',
        description: 'Ask from this country, e.g. us, de, gb: answers, prices and shops follow it.',
        required: false,
      }),
      ...(language ? { language: commonProps.language() } : {}),
      format: commonProps.format(),
    },
    async run({ auth, propsValue }) {
      const p = propsValue as Record<string, unknown>;
      const body = await serpkiteApi.ask(auth.secret_text, path, {
        prompt: p['prompt'],
        track: serpkiteApi.list(p['track']),
        web_search: p['web_search'],
        country: p['country'],
        language: p['language'],
        format: p['format'],
      });
      return wrapMarkdown(p['format'] as string | undefined, body);
    },
  });
}
