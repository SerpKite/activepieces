import { AuthenticationType, httpClient, HttpError, HttpMethod } from '@activepieces/pieces-common';

export const SERPKITE_API_URL = 'https://api.serpkite.com';

/** Searches and pages answer in seconds; AI answers and assistants can take up to 90 s. */
const DEFAULT_TIMEOUT_MS = 60_000;
export const SLOW_TIMEOUT_MS = 120_000;

type SerpkiteError = { error?: { code?: string; message?: string; request_id?: string } };

async function request<T>({
  apiKey,
  method,
  path,
  body,
  timeout = DEFAULT_TIMEOUT_MS,
}: {
  apiKey: string;
  method: HttpMethod;
  path: string;
  body?: Record<string, unknown>;
  timeout?: number;
}): Promise<T> {
  try {
    const response = await httpClient.sendRequest<T>({
      method,
      url: `${SERPKITE_API_URL}${path}`,
      authentication: { type: AuthenticationType.BEARER_TOKEN, token: apiKey },
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'activepieces-serpkite' },
      body: body === undefined ? undefined : compact(body),
      timeout,
    });
    return response.body;
  } catch (e) {
    if (e instanceof HttpError) {
      const status = e.response.status;
      const err = (e.response.body as SerpkiteError | undefined)?.error;
      const detail = err?.message ?? JSON.stringify(e.response.body).slice(0, 500);
      throw new SerpkiteApiError(status, err?.code ?? 'http_error', `SerpKite API error (${status}${err?.code ? ` ${err.code}` : ''}): ${detail}`);
    }
    throw e;
  }
}

export class SerpkiteApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
  }
}

/**
 * Asks an AI assistant. When an answer outlives the request, the API finishes it in the
 * background and the same request sent again within 10 minutes returns it (billed once),
 * so one retry collects it.
 */
async function ask<T>(apiKey: string, path: string, body: Record<string, unknown>): Promise<T> {
  const send = () => request<T>({ apiKey, method: HttpMethod.POST, path, body, timeout: SLOW_TIMEOUT_MS });
  try {
    return await send();
  } catch (e) {
    if (e instanceof SerpkiteApiError && e.code === 'upstream_timeout' && /background/i.test(e.message)) {
      return send();
    }
    throw e;
  }
}

/** Drops unset values so the API's defaults apply (it rejects unknown or empty fields). */
function compact(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

/** Splits a comma or newline separated list ("Sony, anker.com"). */
function list(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const items = value.map((v) => String(v).trim()).filter(Boolean);
    return items.length ? items : undefined;
  }
  if (typeof value === 'string') {
    const items = value.split(/[,\n]/).map((v) => v.trim()).filter(Boolean);
    return items.length ? items : undefined;
  }
  return undefined;
}

export const serpkiteApi = { request, ask, list };
