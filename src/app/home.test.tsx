import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('renders the page', () => {
    render(<Home />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
