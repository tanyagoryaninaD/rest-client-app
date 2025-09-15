import type { VariablesStorage } from '@/types/variables';

export function parseReplaceVariables(
  input: string,
  variables: VariablesStorage,
  { strict = true } = {}
) {
  const variableRegexPattern = /{{\s*([a-zA-Z0-9_-]+)\s*}}/g;

  const replacer = (match: string, variableName: string) => {
    if ((variables as object).hasOwnProperty(variableName)) {
      return variables[variableName];
    }

    if (strict) {
      throw new Error(`Variable "${variableName}" not found`);
    }

    return match;
  };

  return input.replace(variableRegexPattern, replacer);
}
