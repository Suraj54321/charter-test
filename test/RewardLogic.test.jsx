// test/RewardLogic.test.js
import { describe, it, expect } from 'vitest';
import { getTotalRewards } from '../src/components/RewardLogic';

describe('Reward Logic', () => {
  it('calculates reward points correctly', () => {
    const transactions = [
      { amount: 120 },
      { amount: 80 },
      { amount: 40 }
    ];
    const total = getTotalRewards(transactions);
    expect(total).toBe(120);
  });

  it('returns 0 for empty transactions', () => {
    const total = getTotalRewards([]);
    expect(total).toBe(0);
  });
});
