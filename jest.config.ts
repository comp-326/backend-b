export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	resolver: 'ts-jest-resolver',
	// preset: '@shelf/jest-mongodb',
	// globalSetup:'./test-setup/setup.ts',
	// globalTeardown:'./test-setup/tearDown.ts',
	moduleNameMapper: {
		'^@comp326-app': '<rootDir>/src/app',
		'^@comp326-config': '<rootDir>/src/config',
		'^@comp326-api/(.*)$': '<rootDir>/src/api/$1',
		'^@comp326-common/(.*)$': '<rootDir>/src/common/$1',
		'^@comp326-helpers/(.*)$': '<rootDir>/src/helpers/$1',
		'^@comp326-schema/(.*)$': '<rootDir>/src/schema/$1',
		'^@comp326-logger': '<rootDir>/src/logger',
		'^@comp326-server': '<rootDir>/src/server',
		'^@comp326-db/(.*)$': '<rootDir>/src/db/$1',
		'^@comp326-utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@comp326-constants/(.*)$': '<rootDir>/src/constants/$1',
		
	},

	coveragePathIgnorePatterns: ['/node_modules/'],
	// moduleDirectories: ["node_modules", "./", "./src", "./src/domains"],
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
	notify: false,
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/test/**/*.[jt]s?(x)',
		'**/?(*.)+(spec|test).[tj]s?(x)',
	],

	testPathIgnorePatterns: ['/node_modules/'],

	transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};