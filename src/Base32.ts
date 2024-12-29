import { binaryToString } from '@alessiofrittoli/crypto-buffer'
import { toDataView, type ToDataViewInput } from '@alessiofrittoli/crypto-buffer/toDataView'


/**
 * Base32 Variant
 * 
 * - `'RFC3548'` - Alias for `'RFC4648'`
 * - `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)
 */
export type Variant = 'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford'


interface EncodeOptions {
	/** If set, forcefully enable or disable padding. The default behavior is to follow the default of the selected variant. */
	padding?: boolean
}


/**
 * Base32 Utility static class.
 * 
 * Supported Variants:
 * 
 * - `'RFC3548'` - Alias for `'RFC4648'`
 * - `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
 * - `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)
 */
export class Base32
{
	/**
	 * Base32 Variant
	 * 
	 * - `'RFC3548'` - Alias for `'RFC4648'`
	 * - `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
	 * - `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
	 * - `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)
	 */
	static VARIANT = {
		/** Alias for `'RFC4648'` */
		RFC3548: 'RFC3548',
		/** [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648) */
		RFC4648: 'RFC4648',
		/** [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648) */
		RFC4648_HEX: 'RFC4648-HEX',
		/** [Crockford's Base32](http://www.crockford.com/wrmg/base32.html) */
		Crockford: 'Crockford',
	} as const


	/**
	 * Alphabet based on the Base32 Variant.
	 * 
	 */
	private static ALPHABET = {
		RFC4648		: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
		RFC4648_HEX	: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
		CROCKFORD	: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
	} as const


	/**
	 * Encode data to Base32.
	 * 
	 * @param	data	The data to encode.
	 * @param	variant	The Variant to use.
	 * @param	options	( Optional ) An object defining encoding options.
	 * @returns	The encoded `data` to Base32 string.
	 * 
	 * ---
	 * 
	 * Supported variants:
	 * 
	 * - `'RFC3548'` - Alias for `'RFC4648'`
	 * - `'RFC4648'` - [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
	 * - `'RFC4648-HEX'` - [base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
	 * - `'Crockford'` - [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)
	 */
	static encode(
		data		: ToDataViewInput,
		variant		: Variant,
		options?	: EncodeOptions,
	)
	{
		options ||= {}

		const resolved	= Base32.getEncodeVariantAlphabetAndPadding( variant )
		const padding	= options.padding ?? resolved.padding
		const view		= toDataView( data )
		
		let bits	= 0
		let value	= 0
		let output	= ''
		
		for ( let i = 0; i < view.byteLength; i++ ) {
			value	= ( value << 8 ) | view.getUint8( i )
			bits	+= 8
		
			while ( bits >= 5 ) {
				output	+= resolved.alphabet[ ( value >>> ( bits - 5 ) ) & 31 ]
				bits	-= 5
			}
		}
		
		if ( bits > 0 ) {
			output += resolved.alphabet[ ( value << ( 5 - bits ) ) & 31 ]
		}
		
		if ( padding ) {
			while ( ( output.length % 8 ) !== 0 ) {
				output += '='
			}
		}
		
		return output

	}


	/**
	 * Decode a Base32 string.
	 * 
	 * @param	input	The input data to decode.
	 * @param	variant	The Variant used to encode the given input.
	 * @returns	The `ArrayBuffer` result of decoded `input`.
	 */
	static decode( input: string, variant: Variant )
	{
		
		let bits	= 0
		let value	= 0
		let index	= 0
		
		const parsed		= Base32.getDecodeVariantAlphabetAndInput( input, variant )
		const { length }	= parsed.input
		const output		= new Uint8Array( ( length * 5 / 8 ) | 0 )

		for ( let i = 0; i < length; i++ ) {
			value	= ( value << 5 ) | Base32.readChar( parsed.alphabet, parsed.input[ i ]! )
			bits	+= 5

			if ( bits >= 8 ) {
				output[ index++ ] = ( value >>> ( bits - 8 ) ) & 255
				bits -= 8
			}
		}

		return output.buffer
	}


	/**
	 * Get the index of the `char` in the Base32 Variant `alphabet`.
	 * 
	 * @param	alphabet	The Base32 Variant alphabet.
	 * @param	char		The character.
	 * @returns	The index of the `char` in the `alphabet`.
	 */
	private static readChar( alphabet: ValueOf<typeof Base32.ALPHABET>, char: string )
	{
		const index = alphabet.indexOf( char )

		if ( index === -1 ) {
			throw new Error( `Invalid character found: "${ char }"` )
		}
	
		return index
	}


	/**
	 * Get Variant alphabet and default padding setting.
	 * 
	 * @param	variant The Base32 Variant.
	 * @returns	An object with `alphabet` and default `padding` flag based on the given `variant`.
	 */
	private static getEncodeVariantAlphabetAndPadding( variant: Variant )
	{
		switch ( variant ) {
			case 'RFC3548':
			case 'RFC4648':
				return {
					alphabet: Base32.ALPHABET.RFC4648,
					padding	: true,
				} as const
			case 'RFC4648-HEX':
				return {
					alphabet: Base32.ALPHABET.RFC4648_HEX,
					padding	: true,
				} as const
			case 'Crockford':
				return {
					alphabet: Base32.ALPHABET.CROCKFORD,
					padding	: false,
				} as const
			default:
				throw new Error( `Unknown base32 variant: ${ variant }` )
		}
	}


	/**
	 * Get Variant alphabet and parsed input.
	 * 
	 * @param	input	The input to parse.
	 * @param	variant	The Base32 Variant.
	 * @returns	An object with `alphabet` and parsed `input` based on the given `variant`.
	 */
	private static getDecodeVariantAlphabetAndInput( input: string, variant: Variant )
	{
		switch ( variant ) {
			case 'RFC3548':
			case 'RFC4648':
				return {
					alphabet: Base32.ALPHABET.RFC4648,
					input	: input.replace( /=+$/, '' ),
				} as const
			case 'RFC4648-HEX':
				return {
					alphabet: Base32.ALPHABET.RFC4648_HEX,
					input	: input.replace( /=+$/, '' ),
				} as const
			case 'Crockford':
				return {
					alphabet: Base32.ALPHABET.CROCKFORD,
					input	: (
						input.toUpperCase()
							.replace( /O/g, '0' )
							.replace( /[IL]/g, '1' )
					),
				} as const
			default:
				throw new Error( `Unknown base32 variant: ${ variant }` )
		}
	}

	static toString = binaryToString
}