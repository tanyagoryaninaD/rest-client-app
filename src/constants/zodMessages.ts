export const AUTH_ERRORS = {
  name: {
    required: 'Enter the name',
    capitalized: 'The name must start with a capital letter',
  },
  age: {
    required: 'Enter your age',
    min: 'Age must be positive',
    max: 'Age should not be more than 100',
  },
  email: {
    invalid: 'Invalid email',
  },
  password: {
    invalid:
      '1 number, 1 uppercased letter, 1 lowercased letter, 1 special character, 8 length',
  },
  confirmPassword: {
    required: 'Confirm your password',
    missmatch: 'Passwords do not match',
  },
};
