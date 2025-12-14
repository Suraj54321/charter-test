/**
 * Calculate reward points based on transaction amount
 * @param {number} amount - Transaction amount in dollars 
 * @returns {number} - Calculated reward points
 */
export function calculateReward(amount) {
  if (amount <= 50) return 0;

  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }

  if (amount > 50) {
    points += (amount - 50) * 1;
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

    let pts = 0;
    if (t.amount > 100) pts += (t.amount - 100) * 2;
    if (t.amount > 50) pts += 50;

    if (!monthly[month]) monthly[month] = 0;
    monthly[month] += pts;
  });

  return monthly;
}

