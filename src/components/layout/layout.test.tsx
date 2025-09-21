import { render, screen } from '@testing-library/react';

import MainLayout from './layout';

jest.mock('@/components/layout/header/header', () => {
  const HeaderMock = () => <div data-testid="header" />;
  return HeaderMock;
});

jest.mock('@/components/layout/footer/footer', () => {
  const FooterMock = () => <div data-testid="footer" />;
  return FooterMock;
});

describe('MainLayout', () => {
  it('should render Header, Footer Child', () => {
    render(
      <MainLayout>
        <div data-testid="child">CHILD</div>
      </MainLayout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('CHILD');
  });
});
