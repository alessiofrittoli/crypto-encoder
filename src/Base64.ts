import { stringToBytes } from '@alessiofrittoli/crypto-buffer'

/**
 * The {@link Base64.encode} supported input Type.
 */
export type EncodeInput = (
	| string
	| number[]
	| ArrayBuffer
	| Int8Array
	| Int16Array
	| Int32Array
	| Uint8Array
	| Uint16Array
	| Uint32Array
	| Uint8ClampedArray
	| Buffer
)


/**
 * Base54 Utility static class.
 * 
 */
class Base64
{
	/**
	 * Normalize a base64 encoded string to base64url.
	 * 
	 * @param	string The string to normalize.
	 * @returns	The normalized string.
	 */
	static fromBase64( string: string, normalize: boolean = true )
	{
		return (
			! normalize ? string : (
				string
					.replace( /=/g, '' )
					.replace( /\+/g, '-' )
					.replace( /\//g, '_' )
			)
		)
	}


	/**
	 * Normalize a base64url encoded string to base64.
	 * 
	 * @param	string The string to normalize.
	 * @returns	The normalized string.
	 */
	static fromBase64url( string: string )
	{
		return (
			string
				.replace( /-/g, '+' )
				.replace( /_/g, '/' )
		)
	}


	/**
	 * Return the string representation of the Buffer.
	 * 
	 * @param buffer The Buffer.
	 * @deprecated use `@alessiofrittoli/crypto-buffer` > bufferToString( ... )
	 * @returns The string representation of the given Buffer.
	 */
	static toString( buffer: Buffer )
	{
		if ( typeof window !== 'undefined' ) {
			return ( new TextDecoder() ).decode( buffer )
		}
		return buffer.toString()
	}


	/**
	 * Encode a string or Buffer to a base64/base64url string.
	 *
	 * @param	input		The data to encode.
	 * @param	normalize	( Optional ) Whether to normalize the string to base64url. Default: `false`.
	 * 
	 * @returns	The encoded base64url ( or base64 if `normalize` is set to false ) string.
	 */
	static encode( input: EncodeInput, normalize: boolean = false )
	{
		if ( typeof input === 'string' ) {
			input = stringToBytes( input )
		}
		if ( input instanceof ArrayBuffer ) {
			input = stringToBytes( new TextDecoder().decode( input ) )
		}
		if (
			input instanceof Int8Array ||
			input instanceof Int16Array ||
			input instanceof Int32Array ||
			input instanceof Uint8Array ||
			input instanceof Uint16Array ||
			input instanceof Uint32Array ||
			input instanceof Uint8ClampedArray
		) {
			input = [ ...input ]
		}

		return (
			typeof window !== 'undefined' ? (
				Base64.fromBase64(
					window.btoa(
						String.fromCharCode(
							...new Uint8Array( input )
						)
					), normalize
				)
			) : (
				Base64.fromBase64(
					Buffer.from( input )
						.toString( normalize ? 'base64url' : 'base64' )
				, normalize )
			)
		)
	}


	/**
	 * Decode a base64url string.
	 *
	 * @param	data The data to decode.
	 * 
	 * @returns	The decoded base64url string Buffer.
	 */
	static decode( data: string )
	{
		if ( typeof window !== 'undefined' ) {
			const base64	= Base64.fromBase64url( data )
			const binString	= window.atob( base64 )
			const bin		= new Uint8Array( binString.length )
	
			for ( let i = 0; i < binString.length; i++ ) {
				bin[ i ] = binString.charCodeAt( i )
			}
			
			return bin.buffer as unknown as Buffer
		}

		return (
			Buffer.from( Base64.fromBase64url( data ), 'base64' )
		)
	}
}


export default Base64