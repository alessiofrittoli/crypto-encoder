import { coerceToUint8Array, type CoerceToUint8ArrayInput } from '@alessiofrittoli/crypto-buffer'
import { binaryToString } from '@alessiofrittoli/crypto-buffer'
import { Base64 } from '../Base64'
import { Base32 } from '../Base32'

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
export class Encoder {
	/**
	 * A list of supported encodings.
	 */
	public static readonly SUPPORTED_ENCODINGS: Encoding[] = [
		'ascii',
		'base32',
		'base64',
		'base64url',
		'binary',
		'hex',
		'latin1',
		'ucs-2',
		'ucs2',
		'utf-16le',
		'utf-8',
		'utf16le',
		'utf8',
	]

	/**
	 * Encodes the given data using the specified encoding.
	 *
	 * @param data The data to encode. This can be a string, Buffer, or Uint8Array.
	 * @param encoding The encoding to use for the output. If not specified, defaults to 'utf8'.
	 * @param inputEncoding The encoding of the input data.
	 * @returns The encoded data as a string.
	 */
	public static encode(
		data: CoerceToUint8ArrayInput,
		encoding?: Encoding,
		inputEncoding?: Encoding,
	): string {
		switch (encoding) {
			case 'base32':
				return Base32.encode(Encoder.decode(data, inputEncoding), 'RFC3548')

			case 'base64':
			case 'base64url':
				return Base64.encode(Encoder.decode(data, inputEncoding), encoding === 'base64url')

			default:
				return typeof Buffer !== 'undefined'
					? Buffer.from(Encoder.decode(data, inputEncoding)).toString(encoding)
					: binaryToString(data)
		}
	}

	/**
	 * Decodes the given data using the specified encoding.
	 *
	 * @param data The data to decode.
	 * @param encoding The encoding of the input data.
	 * @returns The decoded data as a Uint8Array.
	 */
	public static decode(
		data: CoerceToUint8ArrayInput,
		encoding?: Encoding,
	): Uint8Array<ArrayBufferLike> | Buffer<ArrayBuffer> {
		switch (encoding) {
			case 'base32':
				return Base32.decode(data, 'RFC3548')

			case 'base64':
			case 'base64url':
				return Base64.decode(data)

			default:
				return encoding != null && typeof Buffer !== 'undefined'
					? Buffer.from(binaryToString(coerceToUint8Array(data)), encoding)
					: coerceToUint8Array(data)
		}
	}

	public static toString = binaryToString
}
