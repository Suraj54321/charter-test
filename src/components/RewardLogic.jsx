/**
 * Calculate reward points based on transaction amount
 * @param {number} amount - Transaction amount in dollars 
 * @returns {number} - Calculated reward points
 */

const MIN = 0;
const MID = 50;
const MAX = 100;
const ONE = 1;
const TWO = 2;
export function calculateReward(amount) {
  if (amount <= MID) return MIN;

  let points = MIN;

  if (amount > MAX) {
    points += (amount - MAX) * TWO;
    amount = MAX;
  }

  if (amount > MIN) {
    points += (amount - MIN) * ONE;
  }

  return points;
}

/**
 * Calculate total rewards for all transactions
 * @param {Array} transactions - Array of transaction objects 
 * @returns {number} - Total reward points
 */
export function getTotalRewards(transactions) {
  return transactions.reduce((sum, t) => sum + calculateReward(t.amount), 0);
}

/**
 * Format date string to month-year format
 * @param {string} dateStr - Date string 
 * @returns {string} - Formatted momth-year string
 */
export function formatMonth(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

/**
 * Calculate monthly rewards breakdown
 * @param {Array} transaction - Array of transactions objects 
 * @returns {Object} - Object with months as keys and reward points as values
 */
export function calculateMonthlyRewards(transactions) {
  const monthly = {};

  transactions.forEach(t => {
    const month = formatMonth(t.date);

    let pts = MIN;
    if (t.amount > MAX) pts += (t.amount - MAX) * TWO;
    if (t.amount > MID) pts += MID;

    if (!monthly[month]) monthly[month] = MIN;
    monthly[month] += pts;
  });

  return monthly;
}

