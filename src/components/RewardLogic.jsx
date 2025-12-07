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

export function getTotalRewards(transactions) {
  return transactions.reduce((sum, t) => sum + calculateReward(t.amount), 0);
}

export function formatMonth(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

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

