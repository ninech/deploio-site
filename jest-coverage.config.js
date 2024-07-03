// eslint-disable-next-line import/no-anonymous-default-export

export default {
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__fixture__.ts",
    "!src/main.tsx",
    "!src/app.tsx",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!src/**/ReactHookFormDevelopmentTools.tsx",
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/tests/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  resetMocks: true,
  transformIgnorePatterns: ["/node_modules/(?!camelcase-keys)/"],
};
