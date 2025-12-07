// test/CustomerCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerCard from '../src/components/customerCard';

const customer = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  transactions: [
    { amount: 120, id: 't1' },
    { amount: 80, id: 't2' }
  ]
};

describe('CustomerCard', () => {
  it('renders customer name and avatar', () => {
    render(<CustomerCard customer={customer} isTop={false} onView={() => {}} />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', customer.avatar);
  });

  it('renders total reward points', () => {
    render(<CustomerCard customer={customer} isTop={false} onView={() => {}} />);
    expect(screen.getByText(/Total Reward Points/i)).toHaveTextContent('120');
  });

  it('calls onView when View button clicked', () => {
    const onViewMock = vi.fn();
    render(<CustomerCard customer={customer} isTop={false} onView={onViewMock} />);
    fireEvent.click(screen.getByText(/View/i));
    expect(onViewMock).toHaveBeenCalledWith(customer);
  });
});
