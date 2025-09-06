import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';
import NotFound from '@/app/[locale]/[...rest]/page';

const mockBack = jest.fn();

jest.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

const messages = {
  'not-found': {
    title: 'We lack such a page',
    button: 'Go back',
  },
};

describe('NotFound', () => {
  it('clicks to button "Go Back" should call routing.back', async () => {
    render(
      MockIntlProvider(<NotFound />, {
        locale: 'en',
        messages,
      })
    );

    expect(screen.getByText('We lack such a page')).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: messages['not-found'].button,
    });

    await userEvent.click(button);

    expect(mockBack).toHaveBeenCalled();
  });
});
