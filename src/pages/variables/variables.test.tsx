import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { MockIntlProvider } from '@/__test__/mocks/IntlProvider';
import store from '@/store';
import { restoreVariables } from '@/store/slicers/variables-slice';

import Variables from './variables';

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

describe('Variables Page', () => {
  it('should add a new variable and display it in the table', async () => {
    const user = userEvent.setup();
    render(
      MockIntlProvider(
        <Provider store={store}>
          <Variables />
        </Provider>,
        { locale: 'en', messages }
      )
    );

    expect(screen.getByText('No variables')).toBeInTheDocument();

    const nameInput = screen.getByLabelText('Name');
    await user.type(nameInput, 'testVariable');
    const valueInput = screen.getByLabelText('Value');
    await user.type(valueInput, 'testValue');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByText('testVariable')).toBeInTheDocument();
    expect(await screen.findByText('testValue')).toBeInTheDocument();
    expect(screen.queryByText('No variables')).not.toBeInTheDocument();
  });

  it('should remove a variable when the delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      MockIntlProvider(
        <Provider store={store}>
          <Variables />
        </Provider>,
        { locale: 'en', messages }
      )
    );

    store.dispatch(
      restoreVariables({ variable_1: 'value_1', variable_2: 'value_2' })
    );

    const removeButton = await screen.findByTestId(`remove-variable_1`);
    await user.click(removeButton);

    const variable_1 = screen.queryByText('variable_1');
    expect(variable_1).not.toBeInTheDocument();
    const variable_2 = screen.queryByText('variable_2');
    expect(variable_2).toBeInTheDocument();
  });
});
