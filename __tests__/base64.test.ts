import { Base64 } from '@/Base64'
import { stringToBytes } from '@alessiofrittoli/crypto-buffer'
import { coerceToBigInt64Array, coerceToBigUint64Array, } from '@alessiofrittoli/crypto-buffer'

// const str: {
// 	value		: string
// 	base64		: string
// 	base64url	: string
// } = {
// 	value		: 'Hello world! @everyone',
// 	base64		: 'SGVsbG8gd29ybGQhIEBldmVyeW9uZQ==',
// 	base64url	: 'SGVsbG8gd29ybGQhIEBldmVyeW9uZQ',
// }

const str: {
	value		: string
	base64		: string
	base64url	: string
} = {
	value		: '0eacab1f472e752a95fea263375a5e0d00b620ee5f5181234e2e57f95b0f7db3d8478a4339d1fe3a6e22bf40e895acafea75e693f5be58fa1af409035fde7cda',
	base64		: 'MGVhY2FiMWY0NzJlNzUyYTk1ZmVhMjYzMzc1YTVlMGQwMGI2MjBlZTVmNTE4MTIzNGUyZTU3Zjk1YjBmN2RiM2Q4NDc4YTQzMzlkMWZlM2E2ZTIyYmY0MGU4OTVhY2FmZWE3NWU2OTNmNWJlNThmYTFhZjQwOTAzNWZkZTdjZGE=',
	base64url	: 'MGVhY2FiMWY0NzJlNzUyYTk1ZmVhMjYzMzc1YTVlMGQwMGI2MjBlZTVmNTE4MTIzNGUyZTU3Zjk1YjBmN2RiM2Q4NDc4YTQzMzlkMWZlM2E2ZTIyYmY0MGU4OTVhY2FmZWE3NWU2OTNmNWJlNThmYTFhZjQwOTAzNWZkZTdjZGE',
}

const clientSuffix = typeof window !== 'undefined' ? ' in the client' : ''

describe( 'Base64.fromBase64()', () => {

	const test$1 = 'normalizes a base64 String to base64url' + clientSuffix

	it( test$1, () => {
		expect( Base64.fromBase64( str.base64 ) )
			.toBe( str.base64url )
	} )

} )


describe( 'Base64.fromBase64url()', () => {

	const test$1 = 'normalizes a base64url String to base64' + clientSuffix

	it( test$1, () => {
		expect( Base64.fromBase64url( str.base64url ) )
			.toBe( str.base64.replace( /=/g, '' ) )
	} )

} )


describe( 'Base64.encode()', () => {

	it( 'encodes to base64' + clientSuffix, () => {		
		expect( Base64.encode( str.value ) )
			.toBe( str.base64 )
	} )


	it( 'encodes to base64url' + clientSuffix, () => {
		expect( Base64.encode( str.value, true ) )
			.toBe( str.base64url )
	} )


	it( 'encodes Array of bytes to base64' + clientSuffix, () => {
		expect( Base64.encode( stringToBytes( str.value ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Buffer to base64' + clientSuffix, () => {
		expect( Base64.encode( Buffer.from( str.value, 'utf-8' ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes ArrayBuffer to base64' + clientSuffix, () => {
		expect( Base64.encode( new Uint8Array( stringToBytes( str.value ) ).buffer ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Int8Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Int8Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Int16Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Int16Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Int32Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Int32Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Uint8Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Uint8Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Uint16Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Uint16Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Uint32Array to base64' + clientSuffix, () => {
		expect( Base64.encode( new Uint32Array( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes Uint8ClampedArray to base64' + clientSuffix, () => {
		expect( Base64.encode( new Uint8ClampedArray( stringToBytes( str.value ) ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes BigInt64Array to base64' + clientSuffix, () => {
		expect( Base64.encode( coerceToBigInt64Array( str.value ) ) )
			.toBe( str.base64 )
	} )


	it( 'encodes BigUint64Array to base64' + clientSuffix, () => {
		expect( Base64.encode( coerceToBigUint64Array( str.value ) ) )
			.toBe( str.base64 )
	} )

} )


describe( 'Base64.decode()', () => {

	it( 'decodes base64 String' + clientSuffix, () => {		
		const decoded = (
			Base64.toString( Base64.decode( str.base64 ) )
		)
		
		expect( decoded ).toBe( str.value )
	} )
	

	it( 'decodes base64url String' + clientSuffix, () => {		
		const decoded = (
			Base64.toString( Base64.decode( str.base64url ) )
		)

		expect( decoded ).toBe( str.value )
	} )

} )