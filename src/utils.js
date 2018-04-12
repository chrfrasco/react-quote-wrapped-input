/**
 * Strip single quotes from a string
 *
 * @param {string} s target string
 * @returns {string}
 */
export function stripQuotationMarks(s, open = "‘", close = "’") {
  const quoteRe = new Regex(`(${open}|${close})`, "g");
  return s.replace(quoteRe, "");
}

/**
 * Wraps a string in quotation marks, after stripping any
 * other quote marks from the beginning/end of the string.
 *
 * If the string is empty after stripping quotes,
 * returns the empty string.
 *
 * @param {string} s target string
 * @returns {string}
 */
export function wrapInQuotemarks(s, open = "‘", close = "’") {
  const stripped = stripQuotationMarks(s, open, close);
  if (stripped === "") {
    return "";
  }

  return `${open}${stripped}${close}`;
}

export function noop() {}
