import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.d.ts',
    // Server-side files not testable in JSDOM
    '!src/app/layout.tsx',
    '!src/app/error.tsx',
    '!src/app/page.tsx',
    '!src/app/globals.css',
    '!src/app/api/**',
    '!src/components/providers/**',
    // Type-only domain files (interfaces, entity types)
    '!src/domain/**',
    // Real Gemini service (tested via integration — requires real API key)
    '!src/services/gemini/GeminiDreamService.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
