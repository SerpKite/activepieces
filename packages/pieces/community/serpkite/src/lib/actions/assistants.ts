import { createAssistantAction } from '../common/assistant-action';

const VISIBILITY = 'Use for AI visibility: what this assistant tells people about a topic, brand or product, and which sources it cites; Track Brands or Domains reports whether each is named or cited. Each call asks the assistant afresh.';

export const askChatgptAction = createAssistantAction({
  name: 'ask_chatgpt',
  displayName: 'Ask ChatGPT',
  assistant: 'ChatGPT',
  path: '/v1/chatgpt',
  latency: '10–30 s',
  webSearch: true,
  language: false,
  aiDescription: `Asks ChatGPT (chatgpt.com, as a logged-out visitor, searching the web) and returns its answer as text and Markdown with the sources it cited and the products and places it showed. ${VISIBILITY}`,
});

export const askGeminiAction = createAssistantAction({
  name: 'ask_gemini',
  displayName: 'Ask Gemini',
  assistant: 'Google Gemini',
  path: '/v1/gemini',
  latency: '5–30 s',
  aiDescription: `Asks Google Gemini (gemini.google.com, as a logged-out visitor) and returns its answer with the sources it grounded on and the model it reports. ${VISIBILITY}`,
});

export const askCopilotAction = createAssistantAction({
  name: 'ask_copilot',
  displayName: 'Ask Copilot Search',
  assistant: 'Microsoft Copilot Search',
  path: '/v1/copilot',
  latency: '15–40 s',
  aiDescription: `Asks Microsoft Copilot Search, Bing's AI answer, and returns the answer with its cited sources and the product cards beside it. Country and Language set Bing's market. ${VISIBILITY}`,
});

export const askAiModeAction = createAssistantAction({
  name: 'ask_ai_mode',
  displayName: 'Ask Google AI Mode',
  assistant: 'Google AI Mode',
  path: '/v1/ai_mode',
  latency: '5–45 s',
  aiDescription: `Asks Google AI Mode, Google's conversational search, and returns its answer with the sources it cited and any products. Country is the country Google answers for. ${VISIBILITY}`,
});

export const askBraveAiAction = createAssistantAction({
  name: 'ask_brave_ai',
  displayName: 'Ask Brave AI',
  assistant: "Brave Search's AI answer",
  path: '/v1/brave_ai',
  latency: '1–10 s',
  aiDescription: `Asks Brave Search's AI answer (Ask Brave) and returns it with cited sources, the searches it ran and the products it showed. The fastest assistant. ${VISIBILITY}`,
});
