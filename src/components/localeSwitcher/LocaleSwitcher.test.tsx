import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';

import LocaleSwitcher from './LocaleSwitcher';

jest.mock('../../i18n/navigation', () => ({
  usePathname: jest.fn(() => '/some-path'),
  useRouter: jest.fn(),
}));

const messages = {
  languages: {
    en: 'English',
    ru: 'Русский',
  },
};

describe('LocaleSwitcher', () => {
  it('clicks on button should open button group with links', async () => {
    render(MockIntlProvider(<LocaleSwitcher />, { locale: 'en', messages }));

    const button = screen.getByTestId('locale-button');
    await userEvent.click(button);

    const linkEN = screen.getByTestId('locale-en');
    const linkRU = screen.getByTestId('locale-ru');

    expect(linkEN.getAttribute('locale')).toBe('en');
    expect(linkRU.getAttribute('locale')).toBe('ru');

    expect(linkEN.getAttribute('href')).toBe('/some-path');
    expect(linkRU.getAttribute('href')).toBe('/some-path');
  });
});
