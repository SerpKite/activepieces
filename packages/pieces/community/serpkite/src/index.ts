import { createPiece, PieceCategory } from '@activepieces/pieces-framework';
import { serpkiteAuth } from './lib/auth';
import { searchAction } from './lib/actions/search';
import { newsAction } from './lib/actions/news';
import { imagesAction } from './lib/actions/images';
import { videosAction } from './lib/actions/videos';
import { shoppingAction } from './lib/actions/shopping';
import { mapsAction } from './lib/actions/maps';
import { placeAction } from './lib/actions/place';
import { scholarAction } from './lib/actions/scholar';
import { patentsAction } from './lib/actions/patents';
import { autocompleteAction } from './lib/actions/autocomplete';
import { webpageAction } from './lib/actions/webpage';
import { extractAction } from './lib/actions/extract';
import { mapSiteAction } from './lib/actions/map-site';
import { answerAction } from './lib/actions/answer';
import {
  askAiModeAction,
  askBraveAiAction,
  askChatgptAction,
  askCopilotAction,
  askGeminiAction,
} from './lib/actions/assistants';
import { getCrawlAction, getResearchAction, startCrawlAction, startResearchAction } from './lib/actions/tasks';
import { getAccountAction } from './lib/actions/account';
import { serpkiteCustomApiCallAction } from './lib/actions/custom-api-call';

export const serpkite = createPiece({
  displayName: 'SerpKite',
  description:
    'Google search API for AI agents: web, news, maps, shopping and scholar results, webpages as Markdown, cited answers, and what ChatGPT, Gemini, Copilot, AI Mode and Brave answer.',
  minimumSupportedRelease: '0.88.2',
  logoUrl: 'https://serpkite.com/favicon.svg',
  categories: [PieceCategory.ARTIFICIAL_INTELLIGENCE, PieceCategory.MARKETING],
  authors: ['Nolikzero'],
  auth: serpkiteAuth,
  actions: [
    searchAction,
    newsAction,
    imagesAction,
    videosAction,
    shoppingAction,
    mapsAction,
    placeAction,
    scholarAction,
    patentsAction,
    autocompleteAction,
    webpageAction,
    extractAction,
    mapSiteAction,
    answerAction,
    askChatgptAction,
    askGeminiAction,
    askCopilotAction,
    askAiModeAction,
    askBraveAiAction,
    startCrawlAction,
    getCrawlAction,
    startResearchAction,
    getResearchAction,
    getAccountAction,
    serpkiteCustomApiCallAction,
  ],
  triggers: [],
});
