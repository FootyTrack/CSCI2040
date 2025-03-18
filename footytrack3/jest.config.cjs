module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    moduleFileExtensions: ['js', 'jsx'],
  };