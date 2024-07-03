// eslint-disable-next-line import/no-anonymous-default-export

export default {
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/tests/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  modulePaths: ["src", "tests"],
  resetMocks: true,
  transformIgnorePatterns: ["/node_modules/(?!camelcase-keys)/"],
};
