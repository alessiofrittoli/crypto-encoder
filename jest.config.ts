import type { JestConfigWithTsJest } from 'ts-jest'
import dotenv from 'dotenv'

console.log(
`
__________________________________________________
        ______                     __         
       / ____/___  _________  ____/ /__  _____
      / __/ / __ \\/ ___/ __ \\/ __  / _ \\/ ___/
     / /___/ / / / /__/ /_/ / /_/ /  __/ /    
    /_____/_/ /_/\\___/\\____/\\__,_/\\___/_/     
__________________________________________________
`
)

const env = process.env.NODE_ENV

dotenv.config( { path: [
	`.env.${ env }.local`,
	`.env.${ env }`,
	'.env.local',
	'.env'
] } )


/**
 * Initial file generated with `npx ts-jest config:init`
 * 
 */
const config: JestConfigWithTsJest = {
	/** https://jestjs.io/docs/configuration#testenvironment-string */
	testEnvironment: 'node',
	moduleDirectories: [ 'node_modules', '<rootDir>/' ],
	setupFilesAfterEnv: [ './jest.setup.ts' ],
	testMatch: [ '**/__tests__/**/*.(test|spec).ts' ],
	/**
	 * If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
	 * you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
	 * The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
	 */
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+.tsx?$': [ 'ts-jest', {} ],
	},
}

export default config