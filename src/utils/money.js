/**
 * FlowCash — Money utility helpers.
 *
 * All internal monetary values are stored as BIGINT cents to avoid
 * floating-point rounding errors. These helpers convert for display.
 */

/**
 * Convert cents (integer) to a dollar string.
 * @param {number} cents — e.g. 1050
 * @returns {string} — e.g. "10.50"
 */
function centsToDollars(cents) {
    return (cents / 100).toFixed(2);
}

/**
 * Convert a dollar amount (number or string) to cents.
 * @param {number|string} dollars — e.g. 10.50 or "10.50"
 * @returns {number} — e.g. 1050
 */
function dollarsToCents(dollars) {
    return Math.round(parseFloat(dollars) * 100);
}

/**
 * Format cents as a currency string.
 * @param {number} cents — e.g. 1050
 * @returns {string} — e.g. "$10.50"
 */
function formatCurrency(cents) {
    return `$${centsToDollars(cents)}`;
}

module.exports = {
    centsToDollars,
    dollarsToCents,
    formatCurrency,
};
