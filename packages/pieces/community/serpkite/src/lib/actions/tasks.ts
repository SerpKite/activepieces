import { createAction, Property } from '@activepieces/pieces-framework';
import { HttpMethod } from '@activepieces/pieces-common';
import { serpkiteAuth } from '../auth';
import { serpkiteApi } from '../common/client';
import { PRICING_NOTE } from '../common/props';

const taskId = Property.ShortText({ displayName: 'Task ID', description: 'The id returned when the task was started.', required: true });

export const startCrawlAction = createAction({
  auth: serpkiteAuth,
  name: 'start_crawl',
  displayName: 'Start Site Crawl',
  description: `Start reading a whole website or section as Markdown, following links (and the sitemap) and honouring robots.txt. Returns a task id for Get Crawl Result. Only pages read are billed. ${PRICING_NOTE}`,
  classification: 'WRITE',
  audience: 'both',
  aiMetadata: {
    description:
      'Starts an asynchronous crawl of one website: pages are read as Markdown, following links up to Max Depth hops; with Query the most relevant pages are read first. Returns a task id; poll it with Get Crawl Result. Not idempotent: each call starts a new crawl.',
    idempotent: false,
  },
  props: {
    url: Property.ShortText({ displayName: 'Start URL', required: true }),
    limit: Property.Number({ displayName: 'Page Limit', description: 'Maximum pages read (1 to 1,000; default 25).', required: false }),
    max_depth: Property.Number({ displayName: 'Max Depth', description: 'Link hops from the start URL (0 to 10; default 2).', required: false }),
    query: Property.ShortText({ displayName: 'Query', description: 'Read the pages most relevant to these words first.', required: false }),
    include_paths: Property.Array({ displayName: 'Include Paths', description: 'Regular expressions; follow only URL paths matching one.', required: false }),
    exclude_paths: Property.Array({ displayName: 'Exclude Paths', description: 'Regular expressions; never follow URL paths matching one.', required: false }),
    webhook_url: Property.ShortText({ displayName: 'Webhook URL', description: 'Receives a signed crawl.completed event when the crawl ends, e.g. a Catch Webhook trigger URL.', required: false }),
  },
  async run({ auth, propsValue }) {
    const p = propsValue;
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/crawl',
      body: {
        url: p.url,
        limit: p.limit,
        max_depth: p.max_depth,
        query: p.query,
        include_paths: serpkiteApi.list(p.include_paths),
        exclude_paths: serpkiteApi.list(p.exclude_paths),
        webhook_url: p.webhook_url,
      },
    });
  },
});

export const getCrawlAction = createAction({
  auth: serpkiteAuth,
  name: 'get_crawl',
  displayName: 'Get Crawl Result',
  description: 'Get the status and pages of a crawl started with Start Site Crawl (kept for 24 hours). Free.',
  classification: 'READ',
  audience: 'both',
  aiMetadata: { description: 'Returns the status (queued, running, completed, failed) and, when done, the pages of a crawl by task id. Read-only.', idempotent: true },
  props: { id: taskId },
  async run({ auth, propsValue }) {
    return serpkiteApi.request({ apiKey: auth.secret_text, method: HttpMethod.GET, path: `/v1/crawl/${encodeURIComponent(propsValue.id)}` });
  },
});

export const startResearchAction = createAction({
  auth: serpkiteAuth,
  name: 'start_research',
  displayName: 'Start Deep Research',
  description: `Start a research task: planned web searches, page reading and a cited Markdown report. Returns a task id for Get Research Result. Billed by effort only when the report is written. ${PRICING_NOTE}`,
  classification: 'WRITE',
  audience: 'both',
  aiMetadata: {
    description:
      'Starts an asynchronous deep-research task on a question: it plans web searches, reads pages and writes a cited Markdown report. Returns a task id; poll it with Get Research Result. Not idempotent: each call starts a new task.',
    idempotent: false,
  },
  props: {
    input: Property.LongText({ displayName: 'Research Question', required: true }),
    effort: Property.StaticDropdown({
      displayName: 'Effort',
      description: 'Lite is quickest; Deep reads the most sources.',
      required: false,
      defaultValue: 'standard',
      options: {
        options: [
          { label: 'Lite', value: 'lite' },
          { label: 'Standard', value: 'standard' },
          { label: 'Deep', value: 'deep' },
        ],
      },
    }),
    webhook_url: Property.ShortText({ displayName: 'Webhook URL', description: 'Receives a signed research.completed event with the report.', required: false }),
  },
  async run({ auth, propsValue }) {
    return serpkiteApi.request({
      apiKey: auth.secret_text,
      method: HttpMethod.POST,
      path: '/v1/research',
      body: { input: propsValue.input, effort: propsValue.effort, webhook_url: propsValue.webhook_url },
    });
  },
});

export const getResearchAction = createAction({
  auth: serpkiteAuth,
  name: 'get_research',
  displayName: 'Get Research Result',
  description: 'Get the status and report of a task started with Start Deep Research (kept for 24 hours). Free.',
  classification: 'READ',
  audience: 'both',
  aiMetadata: { description: 'Returns the status and, when done, the cited Markdown report of a research task by task id. Read-only.', idempotent: true },
  props: { id: taskId },
  async run({ auth, propsValue }) {
    return serpkiteApi.request({ apiKey: auth.secret_text, method: HttpMethod.GET, path: `/v1/research/${encodeURIComponent(propsValue.id)}` });
  },
});
