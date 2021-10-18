const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/main/handler/**',
    '<rootDir>/src/main/container/**',
    '!<rootDir>/src/data/repositories/**',
    '!<rootDir>/src/data/dtos/**',
    '!<rootDir>/src/main/adapters/**',
    '!<rootDir>/src/main/routes/**',
    '!<rootDir>/src/main/*.ts',
    '!<rootDir>/src/infra/db/prisma/client/**',
    '!<rootDir>/src/infra/db/prisma/*.ts',
    '!<rootDir>/src/infra/db/prisma/migrations/**',
    '!<rootDir>/src/domain/models/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/presentation/errors/*.ts',
    '!<rootDir>/src/presentation/helpers/translation/*.ts',
    '!**/factories/**',
    '!**/protocols/**',
    '!**/test/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/factory/'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/factory/singleton.ts'],
};
