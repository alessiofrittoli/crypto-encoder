import { binaryToString } from '@alessiofrittoli/crypto-buffer'
import { coerceToUint8Array, type CoerceToUint8ArrayInput } from '@alessiofrittoli/crypto-buffer'
import { Base32 } from './Base32'
import { Base64 } from './Base64'


/**
 * Represents the encoding types that can be used.
 * 
 * This type includes all standard `BufferEncoding` types as well as a custom 'base32' encoding.
 */
export type Encoding = BufferEncoding | 'base32'


/**
 * The Encoder class provides static methods for encoding and decoding data
 * using various encoding schemes such as base32, base64, and others.
 */
export class Encoder
{
	/**
	 * A list of supported encodings.
	 */
	static SUPPORTED_ENCODINGS: Encoding[] = [
		'ascii', 'base32', 'base64', 'base64url', 'binary', 'hex', 'latin1',
		'ucs-2', 'ucs2', 'utf-16le', 'utf-8', 'utf16le', 'utf8'
	]


	/**
	 * Encodes the given data using the specified encoding.
	 *
	 * @param data - The data to encode. This can be a string, Buffer, or Uint8Array.
	 * @param encoding - The encoding to use for the output. If not specified, defaults to 'utf8'.
	 * @param inputEncoding - The encoding of the input data.
	 * @returns The encoded data as a string.
	 */
	static encode( data: CoerceToUint8ArrayInput, encoding?: Encoding, inputEncoding?: Encoding )
	{
		return (
			encoding === 'base32'
				? Base32.encode( Encoder.decode( data, inputEncoding ), 'RFC3548' )
			: ( encoding === 'base64' || encoding === 'base64url' )
				? Base64.encode( Encoder.decode( data, inputEncoding ), encoding === 'base64url' )
			: typeof Buffer !== 'undefined'
				? Buffer.from( Encoder.decode( data, inputEncoding ) ).toString( encoding )
				: binaryToString( data )
		)
	}


	/**
	 * Decodes the given data using the specified encoding.
	 *
	 * @param data - The data to decode.
	 * @param encoding - The encoding of the input data.
	 * @returns The decoded data as a Uint8Array.
	 */
	static decode( data: CoerceToUint8ArrayInput, encoding?: Encoding )
	{
		return (
			encoding === 'base32'
				? Base32.decode( data, 'RFC3548' )
			: ( encoding === 'base64' || encoding === 'base64url' )
				? Base64.decode( data )
			: encoding != null && typeof Buffer !== 'undefined'
				? Buffer.from( binaryToString( coerceToUint8Array( data ) ), encoding )
				: coerceToUint8Array( data )
		)
	}


	static toString = binaryToString
}