# Crypto Encoder 🧮

Version 2.0.0

## Lightweight TypeScript encoder/decoder library

### Table of Contents

- [Getting started](#getting-started)
- [Base32](#base32)
- [Base64](#base64)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `crypto-encoder` in your projects:

```bash
npm i @alessiofrittoli/crypto-encoder
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/crypto-encoder
```

---

### Base32

This module provides a `Base32` utility class for encoding and decoding data according to various `Base32` specifications.\
It supports multiple `Base32` variants and offers flexible options for encoding.

<details>

<summary>Overview</summary>

The `Base32` class provides methods to encode and decode data using Base32, supporting multiple variants as defined by the following specifications:

- [Base32 from RFC4648](https://tools.ietf.org/html/rfc4648)
- [Base32hex from RFC4648](https://tools.ietf.org/html/rfc4648)
- [Crockford's Base32](http://www.crockford.com/wrmg/base32.html)

</details>

<details>

<summary>Variants</summary>

The following Base32 variants are supported:

- `RFC3548` - Alias for `RFC4648`
- `RFC4648` - The standard Base32 encoding.
- `RFC4648-HEX` - Base32 encoding with a hexadecimal-like alphabet.
- `Crockford` - A Base32 variant designed to be human-friendly.

</details>

<details>

<summary>API Reference</summary>

#### Static Properties

##### `Base32.VARIANT`

An object containing the available Base32 variants:

```ts
Base32.VARIANT = {
	RFC3548		: 'RFC3548',
	RFC4648		: 'RFC4648',
	RFC4648_HEX	: 'RFC4648-HEX',
	Crockford	: 'Crockford',
}
```

#### Static Methods

##### `Base32.encode()`

Encodes data to a Base32 string.

###### Parameters

| Parameter         | Type            | Description                        |
|-------------------|-----------------|------------------------------------|
| `data`            | `string \| number[] \| ArrayLike<number> \| ArrayBuffer \| Int8Array \| Int16Array \| Int32Array \| Uint8Array \| Uint16Array \| Uint32Array \| Uint8ClampedArray` | The data to encode. |
| `variant`         | `Variant`       | The Base32 variant to use. |
| `options`         | `EncodeOptions` | (Optional) Encoding options. |
| `options.padding` | `boolean`       | If set, forcefully enable or disable padding. The default behavior is to follow the default of the selected variant. |

###### Returns

Type: `string`

A Base32 encoded string.

###### Example usage

```ts
import { Base32 } from '@alessiofrittoli/crypto-encoder'
// or
import Base32 from '@alessiofrittoli/crypto-encoder/Base32'

console.log( Base32.encode( 'some value', 'RFC3548' ) )
// or
console.log( Base32.encode( 'some value', Base32.VARIANT.RFC3548 ) )
// Outputs: 'ONXW2ZJAOZQWY5LF'
```

---

##### `Base32.decode()`

Decodes a Base32 string to binary data.

###### Parameters

| Parameter         | Type            | Description                                  |
|-------------------|-----------------|----------------------------------------------|
| `input`           | `string`        | The Base32-encoded string.                   |
| `variant`         | `Variant`       | The Base32 variant used to encode the input. |

###### Returns

Type: `ArrayBuffer`

An `ArrayBuffer` containing the decoded data.

###### Example usage

```ts
import { Base32 } from '@alessiofrittoli/crypto-encoder'
// or
import Base32 from '@alessiofrittoli/crypto-encoder/Base32'

const input		= 'ONXW2ZJAOZQWY5LF'
const decoded	= Base32.decode( input, 'RFC3548' )
// or
const decoded	= Base32.decode( input, Base32.VARIANT.RFC3548 )

console.log( Buffer.from( decoded ).toString() ) // Node.js
// or
console.log( new TextDecoder().decode( decoded ) ) // client-side
// or
console.log( Base32.toString( decoded ) ) // Node.js + client-side
// Outputs: 'some value'
```

</details>

---

### Base64

This module provides a static `Base64` utility class for encoding and decoding data to and from Base64/Base64url formats. It supports various input types and offers options for normalization between Base64 and Base64url formats.

<details>

<summary>Overview</summary>

The `Base64` class provides static methods for:

- Encoding data to Base64/Base64url strings.
- Decoding Base64/Base64url strings to binary data.
- Normalizing strings between Base64 and Base64url formats.

The implementation is compatible with both browser and Node.js environments.

</details>

<details>

<summary>API Reference</summary>

#### Static Methods

##### `Base64.encode()`

Encodes data to a Base64 or Base64url string.

###### Parameters

| Parameter | Type            | Default | Description                                   |
|-----------|-----------------|---------| ----------------------------------------------|
| `input`   | `string \| number[] \| Buffer \| ArrayBuffer \| Int8Array \| Int16Array \| Int32Array \| Uint8Array \| Uint16Array \| Uint32Array \| Uint8ClampedArray` | -       | The data to encode. |
| `normalize` | `boolean`       | `false`  | Whether to normalize the output to Base64url. |

###### Returns

Type: `string`

A Base64 or Base64url encoded string.

###### Example

```ts
const data		= 'Hello, World!'
const base64	= Base64.encode( data )
const base64url	= Base64.encode( data, true )

console.log( base64 ) // Outputs: 'SGVsbG8sIFdvcmxkIQ=='
console.log( base64url ) // Outputs: 'SGVsbG8sIFdvcmxkIQ'
```

---

##### `Base64.decode()`

Decodes a Base64 or Base64url string.

###### Parameters

| Parameter | Type     | Description                               |
|-----------|----------|-------------------------------------------|
| `data`    | `string` | The Base64 or Base64url string to decode. |

###### Returns

Type: `Buffer`

A `Buffer` containing the decoded data.

###### Example

```ts
const base64	= 'SGVsbG8sIFdvcmxkIQ=='
const base64url	= 'SGVsbG8sIFdvcmxkIQ'

console.log( Base64.toString( Base64.decode( base64 ) ) )
// or
console.log( Base64.toString( Base64.decode( base64url ) ) )
// Outputs: 'Hello, World!'
```

</details>

---

<!-- ### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build your source code

Run the following command to build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test

# Run tests in a CI environment.
pnpm test:ci
```

You can eventually run specific suits like so:

```bash
pnpm test:jest
pnpm test:base64
pnpm test:base64:jsdom
```

---

### Contributing

Contributions are truly welcome!\
Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

--- -->

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
	<tbody>
		<tr>
			<td>
				<img src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
			</td>
			<td>
				<table style='display:flex;gap:2px;flex-direction:column;'>
					<tbody>
						<tr>
							<td>
								<a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
							</td>
						</tr>
						<tr>
							<td>
								<small>
									<a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
									<a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
								</small>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>