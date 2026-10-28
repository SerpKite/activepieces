# SerpKite

[SerpKite](https://serpkite.com) is a Google search API built for AI agents. This piece runs Google searches, reads webpages as Markdown, writes cited answers and asks public AI assistants (ChatGPT, Gemini, Copilot Search, Google AI Mode, Brave) what they answer.

## Actions

- **Search Google**: organic results, answer box, knowledge graph, People Also Ask and related searches. Optional: read the top pages, add a cited answer.
- **Search Google News / Images / Videos / Shopping / Scholar / Patents**, **Get Google Autocomplete**
- **Search Google Maps** and **Get Place Details** (opening hours, phone, website, rating)
- **Fetch Webpage**: one URL (HTML or PDF) as clean Markdown with metadata
- **Extract Pages**: up to 20 URLs, with query-ranked passages, AI summaries or JSON matching your schema
- **Map a Website**: list a site's URLs, optionally ranked by search words
- **Answer with Citations**: a short answer from live Google results with numbered sources
- **Ask ChatGPT / Gemini / Copilot Search / Google AI Mode / Brave AI**: the assistant's answer as a logged-out visitor, with cited sources, products and, with *Track Brands or Domains*, whether each brand or domain is mentioned or cited
- **Start Site Crawl / Get Crawl Result**, **Start Deep Research / Get Research Result**: long-running tasks; poll with the Get action or pass a webhook URL
- **Get Account Balance** (free) and **Custom API Call** (any `https://api.serpkite.com` endpoint)

Every action can output JSON (fields to map) or Markdown (compact text for an AI step), where the API offers both.

## Response times

Searches and pages answer in a few seconds. AI assistants take longer: Brave AI 1–10 s, Gemini 5–30 s, ChatGPT 10–30 s, Google AI Mode 5–45 s, Copilot Search 15–40 s. The assistant actions wait up to 120 s per request and retry once to collect an answer that was still being finished, so they fit in the default 600 s step limit.

## Authentication

1. Sign up at [serpkite.com](https://serpkite.com) (no card needed).
2. Create a key under **API keys** in the [dashboard](https://app.serpkite.com).
3. Paste the key (`skt_live_…`) into the connection. Checking it is free.

## Pricing

Prices per request are on [serpkite.com/pricing](https://serpkite.com/pricing). Failed and empty requests are not billed.
