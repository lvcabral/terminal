module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/index.js',
    '!**/node_modules/**',
    '!App.js',
  ],
  coverageDirectory: 'build/coverage',
  coverageReporters: [
    'json',
    'text',
    'html',
  ],
  moduleNameMapper: {
    '\\.(css|jpg|png)$': 'identity-obj-proxy',
  },
  setupFiles: ['<rootDir>/test/setup.js'],
  testMatch: [
    '<rootDir>/test/**/*.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules',
  ],
  silent: true,
  testEnvironment: 'jsdom',
  testURL: 'http://localhost/',
};
