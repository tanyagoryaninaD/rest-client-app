import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/\\$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  coverageReporters: ['text', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

export default createJestConfig(customJestConfig);
