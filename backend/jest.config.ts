import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^@product/(.*)$': '<rootDir>/src/product/$1',
    '^@order/(.*)$': '<rootDir>/src/order/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@user/(.*)$': '<rootDir>/src/user/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
