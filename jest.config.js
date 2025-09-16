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
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/__test__/mocks/'],
  testMatch: [
    '**/__tests__/**/*.?([mc])[jt]s?(x)',
    '**/?(*.)+(spec|test).?([mc])[jt]s?(x)',
  ],
  testTimeout: 6000,
};

const createJestConfigWithOverrides = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: [
    'node_modules/(?!(next-intl|use-intl|@mui|@emotion|jose|jwks-rsa|firebase-admin|@firebase)/)',
  ],
});

export default createJestConfigWithOverrides;
