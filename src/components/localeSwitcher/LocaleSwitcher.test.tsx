import { render, screen } from '@testing-library/react';
import LocaleSwitcher from './LocaleSwitcher';
import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';
import userEvent from '@testing-library/user-event';

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

    const button = screen.getByTestId('local-button');
    await userEvent.click(button);

    const linkEN = screen.getByTestId('local-en');
    const linkRU = screen.getByTestId('local-ru');

    expect(linkEN.getAttribute('locale')).toBe('en');
    expect(linkRU.getAttribute('locale')).toBe('ru');

    expect(linkEN.getAttribute('href')).toBe('/some-path');
    expect(linkRU.getAttribute('href')).toBe('/some-path');
  });
});
