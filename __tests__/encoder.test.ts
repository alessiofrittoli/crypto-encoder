import { Encoder, type Encoding } from '@/Encoder'
import type { CoerceToUint8ArrayInput } from '@alessiofrittoli/crypto-buffer'

const stringData = 'dec0d3d v@lu3 with #spec1al!! chars!'

const tests: ( {
	input			: CoerceToUint8ArrayInput
	output			: string
	encoding		: Encoding
	inputEncoding?	: Encoding
} )[] = [
	{
		input		: stringData,
		output		: stringData,
		encoding	: 'ascii',
	},
	{
		input		: stringData,
		output		: 'MRSWGMDEGNSCA5SANR2TGIDXNF2GQIBDONYGKYZRMFWCCIJAMNUGC4TTEE======',
		encoding	: 'base32',
	},
	{
		input		: stringData,
		output		: 'ZGVjMGQzZCB2QGx1MyB3aXRoICNzcGVjMWFsISEgY2hhcnMh',
		encoding	: 'base64',
	},
	{
		input		: stringData,
		output		: 'ZGVjMGQzZCB2QGx1MyB3aXRoICNzcGVjMWFsISEgY2hhcnMh',
		encoding	: 'base64url',
	},
	{
		input		: stringData,
		output		: stringData,
		encoding	: 'binary',
	},
	{
		input		: stringData,
		output		: '646563306433642076406c7533207769746820237370656331616c212120636861727321',
		encoding	: 'hex',
	},
	{
		input		: stringData,
		output		: stringData,
		encoding	: 'latin1',
	},
	{
		input		: stringData,
		output		: '敤っ㍤⁤䁶畬″楷桴⌠灳捥愱Ⅼ‡档牡ⅳ',
		encoding	: 'ucs-2',
	},
	{
		input		: stringData,
		output		: '敤っ㍤⁤䁶畬″楷桴⌠灳捥愱Ⅼ‡档牡ⅳ',
		encoding	: 'ucs2',
	},
	{
		input		: stringData,
		output		: '敤っ㍤⁤䁶畬″楷桴⌠灳捥愱Ⅼ‡档牡ⅳ',
		encoding	: 'utf-16le',
	},
	{
		input		: stringData,
		output		: stringData,
		encoding	: 'utf-8',
	},
	{
		input		: stringData,
		output		: '敤っ㍤⁤䁶畬″楷桴⌠灳捥愱Ⅼ‡档牡ⅳ',
		encoding	: 'utf16le',
	},
	{
		input		: stringData,
		output		: stringData,
		encoding	: 'utf8',
	},
	{
		input			: '646563306433642076406c7533207769746820237370656331616c212120636861727321',
		output			: 'ZGVjMGQzZCB2QGx1MyB3aXRoICNzcGVjMWFsISEgY2hhcnMh',
		encoding		: 'base64url',
		inputEncoding	: 'hex',
	},
	{
		input		: stringData,
		output		: stringData,
		// @ts-expect-error negative testing
		encoding	: 'doesntevenexists',
	},
]


describe( 'Encoder', () => {

	describe( 'Encoder.SUPPORTED_ENCODINGS', () => {
		it( 'includes all standard `BufferEncoding` types and `base32`', () => {
			const expectedEncodings: Encoding[] = [
				'ascii', 'base32', 'base64', 'base64url', 'binary', 'hex', 'latin1',
				'ucs-2', 'ucs2', 'utf-16le', 'utf-8', 'utf16le', 'utf8'
			]
			expect( Encoder.SUPPORTED_ENCODINGS )
				.toEqual( expect.arrayContaining( expectedEncodings ) )
		} )
	} )


	describe( 'Encoder.encode()', () => {
	
		tests.map( test => {
			if ( Encoder.SUPPORTED_ENCODINGS.includes( test.encoding ) ) {
				const testname = [
					'encodes',
					test.inputEncoding ? `from ${ test.inputEncoding }` : null,
					`to ${ test.encoding }`
				].filter( Boolean )
	
				it( testname.join( ' ' ), () => {
					const encoded = Encoder.encode( test.input, test.encoding, test.inputEncoding )
					expect( encoded )
						.toBe( test.output )
				} )
				return
			}
	
			it( 'throws a TypeError with an unsupported encoding', () => {
				expect( () => Encoder.encode( test.input, test.encoding, test.inputEncoding ) )
					.toThrow( `Unknown encoding: ${ test.encoding }` )
			} )
		} )

	} )


	describe( 'Encoder.decode()', () => {

		tests.map( test => {
			if ( Encoder.SUPPORTED_ENCODINGS.includes( test.encoding ) ) {
				const testname = [
					'decodes',
					`from ${ test.encoding }`,
					test.inputEncoding ? `to ${ test.inputEncoding }` : null,
				].filter( Boolean )
	
				it( testname.join( ' ' ), () => {
					const decoded = Encoder.decode( test.output, test.encoding )
					expect( Encoder.encode( decoded, test.inputEncoding ) )
						.toBe( test.input )
				} )
				return
			}
	
			it( 'throws a TypeError with an unsupported encoding', () => {
				expect( () => Encoder.decode( test.output, test.encoding ) )
					.toThrow( `Unknown encoding: ${ test.encoding }` )
			} )
		} )

	} )

} )