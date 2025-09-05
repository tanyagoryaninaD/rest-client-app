import { render, screen } from '@testing-library/react';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';

import ErrorBoundary from './error-boundary';

describe('ErrorBoundary', () => {
  it('renders fallback UI when child component throws an error', () => {
    const ErrorComponent = () => {
      throw new Error('Test Error');
    };

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      return;
    });

    render(
      MockIntlProvider(
        <ErrorBoundary
          context={{
            title: 'Something went wrong...',
            button: 'Back Home',
          }}
        >
          <ErrorComponent />
        </ErrorBoundary>
      )
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
