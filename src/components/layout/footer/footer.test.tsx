import { render, screen } from '@testing-library/react';

import { AUTHORS } from '@/constants/authors';

import Footer from './footer';

jest.mock('@/i18n/navigation', () => ({
  Link: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{props.children}</a>
  ),
}));

describe('Footer Component', () => {
  it('should render correct attributes: copyright, author links, and RSS link', () => {
    render(<Footer />);

    expect(screen.getByText(/© TDA 2025/i)).toBeInTheDocument();

    AUTHORS.forEach((author) => {
      const authorLink = screen.getByRole('link', { name: author.name });
      expect(authorLink).toBeInTheDocument();
      expect(authorLink).toHaveAttribute('href', author.github);
    });

    const rssLink = screen.getByRole('link', {
      name: /Rolling Scopes School Logo/i,
    });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
