import { Base32, type Variant } from '@/Base32'

const input = 'some VERY long text with s0m3 sp3c1@l Ch4r4#er?*s!!|\\'
const tests: ( {
	variant	: Variant
	input	: string
	output	: string
	padding?: boolean
} )[] = [
	{
		variant	: 'RFC3548',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY===',
	},
	{
		variant	: 'RFC3548',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY===',
		padding	: true, // variant default
	},
	{
		variant	: 'RFC3548',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY',
		padding	: false,
	},
	{
		variant	: 'RFC4648',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY===',
	},
	{
		variant	: 'RFC4648',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY===',
		padding	: true, // variant default
	},
	{
		variant	: 'RFC4648',
		input	: input,
		output	: 'ONXW2ZJAKZCVEWJANRXW4ZZAORSXQ5BAO5UXI2BAOMYG2MZAONYDGYZRIBWCAQ3IGRZDII3FOI7SU4ZBEF6FY',
		padding	: false,
	},
	{
		variant	: 'RFC4648-HEX',
		input	: input,
		output	: 'EDNMQP90AP2L4M90DHNMSPP0EHINGT10ETKN8Q10ECO6QCP0EDO36OPH81M20GR86HP388R5E8VIKSP145U5O===',
	},
	{
		variant	: 'RFC4648-HEX',
		input	: input,
		output	: 'EDNMQP90AP2L4M90DHNMSPP0EHINGT10ETKN8Q10ECO6QCP0EDO36OPH81M20GR86HP388R5E8VIKSP145U5O===',
		padding	: true, // variant default
	},
	{
		variant	: 'RFC4648-HEX',
		input	: input,
		output	: 'EDNMQP90AP2L4M90DHNMSPP0EHINGT10ETKN8Q10ECO6QCP0EDO36OPH81M20GR86HP388R5E8VIKSP145U5O',
		padding	: false,
	},
	{
		variant	: 'Crockford',
		input	: input,
		output	: 'EDQPTS90AS2N4P90DHQPWSS0EHJQGX10EXMQ8T10ECR6TCS0EDR36RSH81P20GV86HS388V5E8ZJMWS145Y5R',
	},
	{
		variant	: 'Crockford',
		input	: input,
		output	: 'EDQPTS90AS2N4P90DHQPWSS0EHJQGX10EXMQ8T10ECR6TCS0EDR36RSH81P20GV86HS388V5E8ZJMWS145Y5R',
		padding	: false, // variant default
	},
	{
		variant	: 'Crockford',
		input	: input,
		output	: 'EDQPTS90AS2N4P90DHQPWSS0EHJQGX10EXMQ8T10ECR6TCS0EDR36RSH81P20GV86HS388V5E8ZJMWS145Y5R===',
		padding	: true,
	},
]


export const runBase32UnitTests = () => {

	const clientSuffix = typeof window !== 'undefined' ? ' in the client' : ''
	
	describe( 'Base32', () => {

		describe( 'Base32.encode()', () => {
			
			tests.map( test => {
		
				const paddingSuffix = (
					typeof test.padding === 'undefined'
						? 'with default padding'
						: test.padding ? 'with padding' : 'without padding'
				)
		
				it( `encodes using ${ test.variant } - ${ paddingSuffix }` + clientSuffix, () => {
			
					expect( Base32.encode( test.input, test.variant, { padding: test.padding } ) )
						.toBe( test.output )
		
				} )
		
			} )
		
		
			it( 'throws a new Exception if an invalid variant is provided', () => {
				// @ts-expect-error negative testing
				expect( () => Base32.encode( 'Input data', 'Unexisting-Variant' ) )
					.toThrow( 'Unknown base32 variant: Unexisting-Variant' )
			} )
		
		} )
		
		
		describe( 'Base32.decode()', () => {
			
			tests.map( test => {
		
				const paddingSuffix = (
					typeof test.padding === 'undefined'
						? 'with default padding'
						: test.padding ? 'with padding' : 'without padding'
				)
		
		
				it( `decodes using ${ test.variant } - ${ paddingSuffix }` + clientSuffix, () => {
		
					const decoded = Base32.decode( test.output, test.variant )
			
					expect( Base32.toString( decoded ) ).toBe( test.input )
		
				} )
		
			} )
		
		
			it( 'throws a new Exception if an invalid variant is provided', () => {
				// @ts-expect-error negative testing
				expect( () => Base32.decode( 'ONXW2ZJAOZQWY5LF', 'Unexisting-Variant' ) )
					.toThrow( 'Unknown base32 variant: Unexisting-Variant' )
			} )
		
		} )
		
		
		describe( 'Base32.readChar()', () => {
		
			it( 'returns the character index in the alphabet', () => {
				expect( Base32[ 'readChar' ]( Base32[ 'ALPHABET' ].RFC4648, 'G' ) )
					.toBe( 6 )
			} )
		
		
			it( 'throws a new Exception if an invalid character is provided', () => {
				expect( () => Base32[ 'readChar' ]( Base32[ 'ALPHABET' ].RFC4648, '@' ) )
					.toThrow( 'Invalid character found: "@"' )
			} )
		
		} )
		
	} )

}