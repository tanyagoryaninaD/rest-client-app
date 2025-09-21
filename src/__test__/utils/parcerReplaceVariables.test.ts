import { parseReplaceVariables } from '@/utils/parse-replace-variables';

describe('parseReplaceVariables', () => {
  const variables: Record<string, string> = {
    p: 'posts',
    j: 'jsonplaceholder',
    username: 'Denis',
  };

  it('should replace existing variable', () => {
    expect(
      parseReplaceVariables(
        'https://jsonplaceholder.typicode.com/{{p}}',
        variables
      )
    ).toBe('https://jsonplaceholder.typicode.com/posts');
  });

  it('should replace some variables in one string', () => {
    expect(
      parseReplaceVariables('https://{{j}}.typicode.com/{{p}}', variables)
    ).toBe('https://jsonplaceholder.typicode.com/posts');
  });

  it('should keep placeholder if variable not found', () => {
    expect(parseReplaceVariables('Some {{notFound}}', variables)).toBe(
      'Some {{notFound}}'
    );
  });

  it('should throw error if variable not found', () => {
    expect(() =>
      parseReplaceVariables('Some {{notFound}}', variables, { strict: true })
    ).toThrow('Variable "notFound" not found');
  });

  it('should trim spaces inside brackets', () => {
    expect(parseReplaceVariables('Hi {{   username   }}', variables)).toBe(
      'Hi Denis'
    );
  });
});
