import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
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

const createJestConfigWithOverrides = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: [
    'node_modules/(?!(next-intl|use-intl|@mui|@emotion)/)',
  ],
});

export default createJestConfigWithOverrides;
