/** How long one upstream call may hold a socket. A few seconds, not a TCP timeout. */
export const UPSTREAM_TIMEOUT_MS = 3_500;

/** News feeds and the optional summary share this ceiling. */
export const NEWS_BUDGET_MS = 4_000;

/** Quotes newer than this are returned without another upstream call. */
export const BOARD_FRESH_MS = 30_000;

/** Headlines newer than this are returned without another upstream call. */
export const NEWS_FRESH_MS = 180_000;

/**
 * When a last-good payload exists, wait this long for a refresh so a healthy
 * upstream still lands in the response. After that, serve the cached payload
 * and let the refresh finish in the background.
 */
export const REVALIDATE_WAIT_MS = 700;
