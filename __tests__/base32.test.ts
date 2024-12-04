import Base32, { type Variant } from '@/Base32'

const tests: ({
	variant	: Variant
	input	: string
	output	: string
})[] = [
	{
		variant	: 'RFC3548',
		input	: 'some value',
		output	: 'ONXW2ZJAOZQWY5LF',
	},
	{
		variant	: 'RFC4648',
		input	: 'some value',
		output	: 'ONXW2ZJAOZQWY5LF',
	},
	{
		variant	: 'RFC4648-HEX',
		input	: 'some value',
		output	: 'EDNMQP90EPGMOTB5',
	},
	{
		variant	: 'Crockford',
		input	: 'some value',
		output	: 'EDQPTS90ESGPRXB5',
	},
]

const clientSuffix = typeof window !== 'undefined' ? ' in the client' : ''


describe( 'Base32.encode()', () => {
	
	tests.map( test => {

		it( `encodes using ${ test.variant } variant` + clientSuffix, () => {
	
			expect( Base32.encode( test.input, test.variant ) )
				.toBe( test.output )

		} )

	} )

} )


describe( 'Base32.decode()', () => {
	
	tests.map( test => {

		it( `decodes using ${ test.variant } variant` + clientSuffix, () => {

			const decoded = Base32.decode( test.output, test.variant )
	
			expect( Base32.toString( decoded ) ).toBe( test.input )

		} )

	} )

} )