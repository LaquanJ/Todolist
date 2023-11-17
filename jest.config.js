module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!jose)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svg-mock.js',
    '^@assets/(.+)': '<rootDir>/src/assets/$1',
    '^@components/(.+)': '<rootDir>/src/components/$1',
    '^@views/(.+)': '<rootDir>/src/views/$1',
    '^@utilities/(.+)': '<rootDir>/src/utilities/$1',
    '^@mocks/(.+)': '<rootDir>/test/mocks/$1',
    '^@src/(.+)': '<rootDir>/src/$1',
  },
  coverageDirectory: '/tmp',
  coverageReporters: [
    'text',
    [
      'cobertura',
      {
        file: 'unit.coverage.xml',
      },
    ],
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/utilities/todosApi.js',
    '/src/utilities/authentication.js',
    '/src/index.jsx',
    '/src/App.jsx',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '/tmp',
      },
    ],
  ],
  testTimeout: 15000,
};
