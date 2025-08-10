import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  passWithNoTests: true,
  bail: Infinity,
  // detectOpenHandles: true
} as Config

export default config
