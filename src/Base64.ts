import { binaryToLatin1String, coerceToUint8Array } from '@alessiofrittoli/crypto-buffer'
import type { CoerceToUint8ArrayInput } from '@alessiofrittoli/crypto-buffer'


/**
 * Base64 Utility static class.
 * 
 */
export class Base64
{
	/**
	 * Encode a string or Buffer to a base64/base64url string.
	 *
	 * @param	data		The data to encode.
	 * @param	normalize	( Optional ) Whether to normalize the string to base64url. Default: `true`.
	 * 
	 * @returns	The encoded base64url ( or base64 if `normalize` is set to false ) string.
	 */
	static encode( data: CoerceToUint8ArrayInput, normalize: boolean = true )
	{
		const buffer = coerceToUint8Array( data )

		return (
			typeof window !== 'undefined' ? (
				Base64.fromBase64(
					window.btoa(
						Base64.toString( buffer )
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
	 * Decode a base64url data.
	 *
	 * @param	data The data to decode.
	 * 
	 * @returns	The decoded base64url Buffer.
	 */
	static decode( data: CoerceToUint8ArrayInput )
	{
		data = Base64.toString( data )
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
		const base64	= string.replace( /-/g, '+' ).replace( /_/g, '/' )
		const padding	= base64.length % 4 === 0 ? '' : '='.repeat( 4 - ( base64.length % 4 ) )

		return base64 + padding
	}


	static toString = binaryToLatin1String
}