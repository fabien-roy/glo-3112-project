module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'build',
    'src/**/*.stories.ts',
    'src/**/*.stories.tsx'
  ],
};
