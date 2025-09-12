import reducer, {
  addVariable,
  removeVariable,
  restoreVariables,
  type VariablesState,
} from './variables-slice';

describe('variables slice', () => {
  const initialState: VariablesState = {
    variables: {},
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      variables: {},
    });
  });

  it('should handle adding a new variable', () => {
    const previousState: VariablesState = { variables: { var1: 'value_1' } };
    const newState = reducer(
      previousState,
      addVariable({ name: 'var2', value: 'value_2' })
    );
    expect(newState.variables).toEqual({ var1: 'value_1', var2: 'value_2' });
  });

  it('should handle updating an existing variable', () => {
    const previousState: VariablesState = { variables: { var1: 'value_1' } };
    const newState = reducer(
      previousState,
      addVariable({ name: 'var1', value: 'newValue' })
    );
    expect(newState.variables).toEqual({ var1: 'newValue' });
  });

  it('should handle removing a variable', () => {
    const previousState: VariablesState = {
      variables: { var1: 'value_1', var2: 'value_2' },
    };
    const newState = reducer(previousState, removeVariable('var1'));
    expect(newState.variables).toEqual({ var2: 'value_2' });
  });

  it('should handle restoreVariables', () => {
    const newVariables = {
      restored_1: 'restored_value_1',
      restored_2: 'restored_value_2',
    };
    const newState = reducer(initialState, restoreVariables(newVariables));
    expect(newState.variables).toEqual(newVariables);
  });
});
