export function changeVariables(
  field: string,
  variables: Record<string, string>
) {
  let result = '';
  let i = 0;
  for (i = 0; i < field.length; i++) {
    if (field[i] === '{' && field[i + 1] === '{') {
      i += 2;
      let key = '';

      while (!(field[i] === '}' && field[i + 1] === '}')) {
        key += field[i];
        i++;
      }

      i++;
      result += variables[key] || '';
    } else {
      result += field[i];
    }
  }
  return result;
}
