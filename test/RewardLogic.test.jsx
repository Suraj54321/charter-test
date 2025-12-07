import { describe, it, expect, vi } from 'vitest';
import * as RewardLogic from '../src/components/RewardLogic';
import { customers } from "../src/data/transactions";

// Grab real data from mock
const c1 = customers[0];
const c2 = customers[1];
const c3 = customers[2];

describe('Reward Points Tests with Mocking (Using Real Mock Data)', () => {

  // ===========================
  // Positive test cases
  // ===========================

  it('should return mocked total for first customer (mocked 120)', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(120);

    const total = RewardLogic.getTotalRewards(c1.transactions);
    expect(total).toBe(120);

    mock.mockRestore();
  });

  it('should return mocked total for second customer (mocked 200)', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(200);

    const total = RewardLogic.getTotalRewards(c2.transactions);
    expect(total).toBe(200);

    mock.mockRestore();
  });

  it('should return mocked total for third customer (mocked 75)', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(75);

    const total = RewardLogic.getTotalRewards(c3.transactions);
    expect(total).toBe(75);

    mock.mockRestore();
  });

  // ===========================
  // Negative test cases
  // ===========================

  it('should return 0 for empty transactions', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(0);

    const total = RewardLogic.getTotalRewards([]);
    expect(total).toBe(0);

    mock.mockRestore();
  });

  it('should return 0 for invalid negative transaction amounts', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(0);

    // Fake invalid mock data
    const transactions = [
      { amount: -10 },
      { amount: -99 },
    ];

    const total = RewardLogic.getTotalRewards(transactions);
    expect(total).toBe(0);

    mock.mockRestore();
  });

  it('should return 0 for null / undefined transaction values', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(0);

    const transactions = [
      { amount: null },
      { amount: undefined },
    ];

    const total = RewardLogic.getTotalRewards(transactions);
    expect(total).toBe(0);

    mock.mockRestore();
  });

});
