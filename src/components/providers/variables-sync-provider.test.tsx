/* eslint-disable @typescript-eslint/unbound-method */
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';
import store from '@/store';
import type { VariablesState } from '@/store/slicers/variables-slice';
import { addVariable } from '@/store/slicers/variables-slice';
import { restoreVariables } from '@/store/slicers/variables-slice';

import VariablesSyncProvider from './variables-sync-provider';

const messages = {
  variables: {
    title: 'Manage Your Variables',
    name: 'Name',
    value: 'Value',
    add_variable: 'Add',
    data_format_error:
      'Invalid data format in variables storage. The storage was cleared, please try again.',
    no_variables: 'No variables',
    name_required: 'Variable name is required',
    value_required: 'Variable value is required',
    name_wrong_chars: 'Alphanumeric, dashes and underscores only',
    value_wrong_chars: 'Variable value must be alphanumeric',
  },
};

jest.mock('@/utils/get-hash-from-string', () => ({
  getHashFromString: jest.fn().mockResolvedValue('mocked_hash'),
}));

const mockUseUserName = jest.fn().mockReturnValue('testUser');
jest.mock('@/hooks/use-user-name', () => ({
  useUserName: () => mockUseUserName() as string,
}));

describe('VariablesSyncProvider', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    store.dispatch(restoreVariables({}));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should load variables from localStorage and restore them to Redux store on mount', async () => {
    const storedData = { var1: 'value1' };
    const base64Data = btoa(JSON.stringify(storedData));
    (localStorage.getItem as jest.Mock).mockReturnValue(base64Data);

    render(
      MockIntlProvider(
        <Provider store={store}>
          <VariablesSyncProvider>
            <div>Child Component</div>
          </VariablesSyncProvider>
        </Provider>,
        { locale: 'en', messages }
      )
    );

    await waitFor(() => {
      const state = store.getState() as { variables: VariablesState };
      expect(state.variables.variables).toEqual(storedData);
    });

    expect(localStorage.getItem).toHaveBeenCalledWith('TDA__mocked_hash');
  });

  it('should throw an error if the data in localStorage is invalid', async () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('invalid-base64-data');

    const errors: ErrorEvent[] = [];
    const handler = (e: ErrorEvent) => {
      errors.push(e);
      e.preventDefault();
    };
    window.addEventListener('error', handler);

    render(
      MockIntlProvider(
        <Provider store={store}>
          <VariablesSyncProvider>
            <div>Child Component</div>
          </VariablesSyncProvider>
        </Provider>,
        { locale: 'en', messages }
      )
    );

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('TDA__mocked_hash');
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain(
        'Invalid data format in variables storage. The storage was cleared, please try again.'
      );
    });
  });

  it('should save variables to localStorage when the Redux store changes', async () => {
    render(
      MockIntlProvider(
        <Provider store={store}>
          <VariablesSyncProvider>
            <div>Child Component</div>
          </VariablesSyncProvider>
        </Provider>,
        { locale: 'en', messages }
      )
    );

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('TDA__mocked_hash');
    });

    store.dispatch(addVariable({ name: 'newVar', value: 'newValue' }));

    await waitFor(() => {
      const expectedData = { newVar: 'newValue' };
      const expectedBase64Data = btoa(JSON.stringify(expectedData));
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'TDA__mocked_hash',
        expectedBase64Data
      );
    });
  });

  it('should not proceed when user is not logged in (no userName)', async () => {
    mockUseUserName.mockReturnValueOnce(undefined);

    render(
      MockIntlProvider(
        <Provider store={store}>
          <VariablesSyncProvider>
            <div>Child Component</div>
          </VariablesSyncProvider>
        </Provider>,
        { locale: 'en', messages }
      )
    );

    await waitFor(() => {
      expect(localStorage.getItem).not.toHaveBeenCalled();
    });
  });
});
