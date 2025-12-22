import React,{ render, screen, fireEvent } from '@testing-library/react';
import CustomerCard from '../src/components/customerCard';
import * as RewardLogic from '../src/components/RewardLogic';
import { vi, describe, it, expect } from 'vitest';
import { customers } from "../src/data/transactions";

const customer = customers[0];
const customer2 = customers[1];


describe('CustomerCard Component Tests with Mocking', () => {

  // ===========================
  // Positive test cases
  // ===========================
  it('renders customer name and avatar correctly', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(100);

    render(<CustomerCard customer={customer} isTop={true} onView={() => {}} />);

    expect(screen.getByText(/Suraj Tiwari/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', customer.avatar);
    expect(screen.getByText(/Total Reward Points/i)).toHaveTextContent('100');
    expect(screen.getByText(/View/i)).toBeInTheDocument();

    mock.mockRestore();
  });

  it('calls onView when View button is clicked', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(50);
    const onViewMock = vi.fn();

    render(<CustomerCard customer={customer} isTop={false} onView={onViewMock} />);

    fireEvent.click(screen.getByText(/View/i));
    expect(onViewMock).toHaveBeenCalledWith(customer);

    mock.mockRestore();
  });

  it('renders trophy for top customer', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(200);

    render(<CustomerCard customer={customer} isTop={true} onView={() => {}} />);
    expect(screen.getByText(/🏆/i)).toBeInTheDocument();

    mock.mockRestore();
  });

  // ===========================
  // Negative test cases
  // ===========================
  it('renders customer with zero reward points', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(0);

    render(<CustomerCard customer={customer2} isTop={false} onView={() => {}} />);
    expect(screen.getByText(/Total Reward Points/i)).toHaveTextContent('0');

    mock.mockRestore();
  });

  it('handles customer with empty transactions', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(0);

    const emptyCustomer = { ...customer2, transactions: [] };
    render(<CustomerCard customer={emptyCustomer} isTop={false} onView={() => {}} />);
    expect(screen.getByText(/Total Reward Points/i)).toHaveTextContent('0');

    mock.mockRestore();
  });

  it('search simulation: customer not found', () => {
    const mock = vi.spyOn(RewardLogic, 'getTotalRewards').mockReturnValue(100);

    const searchTerm = 'Nonexistent';
    const filtered = [customer, customer2].filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    expect(filtered.length).toBe(0); // search should return 0
    mock.mockRestore();
  });
});
