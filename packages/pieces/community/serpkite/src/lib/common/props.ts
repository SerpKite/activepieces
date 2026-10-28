import { Property } from '@activepieces/pieces-framework';

export const PRICING_NOTE = 'See [serpkite.com/pricing](https://serpkite.com/pricing) for prices; failed and empty requests are not billed.';

export const commonProps = {
  country: () =>
    Property.ShortText({
      displayName: 'Country',
      description: 'Two-letter country code, e.g. us, gb, de. Defaults to us.',
      required: false,
    }),
  language: () =>
    Property.ShortText({
      displayName: 'Language',
      description: 'Interface language code, e.g. en, de, pt-br. Defaults to en.',
      required: false,
    }),
  location: () =>
    Property.ShortText({
      displayName: 'Location',
      description: 'City-level location, e.g. "Austin, Texas, United States".',
      required: false,
    }),
  page: () =>
    Property.Number({
      displayName: 'Page',
      description: 'Result page, 1 to 10.',
      required: false,
    }),
  time: () =>
    Property.StaticDropdown({
      displayName: 'Time Range',
      description: 'Only results from the last hour, day, week, month or year.',
      required: false,
      options: {
        options: [
          { label: 'Past hour', value: 'hour' },
          { label: 'Past day', value: 'day' },
          { label: 'Past week', value: 'week' },
          { label: 'Past month', value: 'month' },
          { label: 'Past year', value: 'year' },
        ],
      },
    }),
  includeDomains: () =>
    Property.Array({
      displayName: 'Include Domains',
      description: 'Only results from these domains, e.g. example.com, github.com/org, .gov.',
      required: false,
    }),
  excludeDomains: () =>
    Property.Array({
      displayName: 'Exclude Domains',
      description: 'Drop results from these domains.',
      required: false,
    }),
  format: () =>
    Property.StaticDropdown({
      displayName: 'Output',
      description: 'JSON gives fields you can map in later steps; Markdown is a compact text version for an AI step.',
      required: false,
      defaultValue: 'json',
      options: {
        options: [
          { label: 'JSON', value: 'json' },
          { label: 'Markdown', value: 'markdown' },
        ],
      },
    }),
};

/** Markdown responses are plain text; wrap them so later steps can map `markdown`. */
export function wrapMarkdown(format: string | undefined, body: unknown): unknown {
  return format === 'markdown' && typeof body === 'string' ? { markdown: body } : body;
}
