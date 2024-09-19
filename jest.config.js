const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'lib/**/*.{js,jsx,ts,tsx}',          // Include all code in lib
    'scripts/**/*.{js,jsx,ts,tsx}',      // Include all code in scripts
    'db/**/*.{js,jsx,ts,tsx}',           // Include all code in db
    'components/**/*.{js,jsx,ts,tsx}',   // Include all code in components
    'app/**/*.{js,jsx,ts,tsx}',          // Include all code in app
    'actions/**/*.{js,jsx,ts,tsx}',      // Include all code in actions
    'types/**/*.{js,jsx,ts,tsx}',        // Include all code in types
    '!**/*.d.ts',                        // Exclude all type definition files
    '!**/__tests__/**/*',                // Exclude __tests__ directory
    '!**/*.test.{js,jsx,ts,tsx}',        // Exclude test files based on naming
    '!**/*.spec.{js,jsx,ts,tsx}',        // Exclude spec files based on naming
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',                    // Exclude node_modules
    '/public/',                          // Exclude public directory
  ],
};

module.exports = createJestConfig(customJestConfig);
