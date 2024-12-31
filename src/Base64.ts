import { binaryToString, coerceToUint8Array } from '@alessiofrittoli/crypto-buffer'
import type { CoerceToUint8ArrayInput } from '@alessiofrittoli/crypto-buffer'

/**
 * The {@link Base64.encode} supported input Type.
 */
export type EncodeInput = (
	| string
	| Array<number>
	| Buffer
	| ArrayBuffer
	| NodeJS.TypedArray
)


/**
 * Base64 Utility static class.
 * 
 */
export class Base64
{
	/**
	 * Encode a string or Buffer to a base64/base64url string.
	 *
	 * @param	input		The data to encode.
	 * @param	normalize	( Optional ) Whether to normalize the string to base64url. Default: `false`.
	 * 
	 * @returns	The encoded base64url ( or base64 if `normalize` is set to false ) string.
	 */
	static encode( input: CoerceToUint8ArrayInput, normalize: boolean = false )
	{
		const buffer = coerceToUint8Array( input )

		return (
			typeof window !== 'undefined' ? (
				Base64.fromBase64(
					window.btoa(
						binaryToString( buffer )
					), normalize
				)
			) : (
				Base64.fromBase64(
					Buffer.from( buffer )
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
		return (
			typeof window !== 'undefined'
				? coerceToUint8Array( window.atob( Base64.fromBase64url( data ) ) )
				: Buffer.from( Base64.fromBase64url( data ), 'base64' )
		)
	}

	
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


	static toString = binaryToString
}