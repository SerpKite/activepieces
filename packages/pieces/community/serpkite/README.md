# SerpKite piece for Activepieces

Google search, Maps, webpages, cited answers and what AI assistants (ChatGPT, Gemini, Copilot Search, Google AI Mode, Brave) answer, in [Activepieces](https://www.activepieces.com) flows. Built for [SerpKite](https://serpkite.com), a Google SERP API for AI agents.

## Install

Self-hosted Activepieces: **Settings → My Pieces → Install Piece**, choose npm and enter `@serpkite/piece-serpkite`. Then add the **SerpKite** piece to a flow and connect it with your API key from [app.serpkite.com](https://app.serpkite.com/keys). Setup guide: [serpkite.com/integrations/activepieces](https://serpkite.com/integrations/activepieces).

## Actions

Search Google (web, News, Images, Videos, Shopping, Maps, Scholar, Patents, Autocomplete), Get Place Details, Fetch Webpage, Extract Pages (highlights, summary, JSON by schema), Map a Website, Answer with Citations, Ask ChatGPT / Gemini / Copilot Search / Google AI Mode / Brave AI, Start Site Crawl / Get Crawl Result, Start Deep Research / Get Research Result, Get Account Balance, and a Custom API Call.

Each action is billed like the API call it makes ([pricing](https://serpkite.com/pricing)); failed and empty requests are not billed.

## Releasing

The npm package is built from this folder with the Activepieces tooling and published by `.github/workflows/publish-serpkite-piece.yml` (npm trusted publishing, with provenance) when a `piece-serpkite-v<version>` tag is pushed. Bump `version` in `package.json` first; the tag must match it.
