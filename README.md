<h1 align="center">Crypto Encoder 🧮</h1>
<p align="center">
  Lightweight TypeScript encoder/decoder library
</p>
<p align="center">
  <a href="https://npmjs.org/package/@alessiofrittoli/crypto-encoder">
    <img src="https://img.shields.io/npm/v/@alessiofrittoli/crypto-encoder" alt="Latest version"/>
  </a>
  <a href="https://coveralls.io/github/alessiofrittoli/crypto-encoder">
    <img src="https://coveralls.io/repos/github/alessiofrittoli/crypto-encoder/badge.svg" alt="Test coverage"/>
  </a>
  <a href="https://socket.dev/npm/package/@alessiofrittoli/crypto-encoder/overview">
    <img src="https://socket.dev/api/badge/npm/package/@alessiofrittoli/crypto-encoder" alt="Socket Security score"/>
  </a>
  <a href="https://npmjs.org/package/@alessiofrittoli/crypto-encoder">
    <img src="https://img.shields.io/npm/dm/@alessiofrittoli/crypto-encoder.svg" alt="npm downloads"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/crypto-encoder">
    <img src="https://badgen.net/bundlephobia/dependency-count/@alessiofrittoli/crypto-encoder" alt="Dependencies"/>
  </a>
  <a href="https://libraries.io/npm/%40alessiofrittoli%2Fcrypto-encoder">
    <img src="https://img.shields.io/librariesio/release/npm/@alessiofrittoli/crypto-encoder" alt="Dependencies status"/>
  </a>
</p>
<p align="center">
  <a href="https://bundlephobia.com/package/@alessiofrittoli/crypto-encoder">
    <img src="https://badgen.net/bundlephobia/min/@alessiofrittoli/crypto-encoder" alt="minified"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/crypto-encoder">
    <img src="https://badgen.net/bundlephobia/minzip/@alessiofrittoli/crypto-encoder" alt="minizipped"/>
  </a>
  <a href="https://bundlephobia.com/package/@alessiofrittoli/crypto-encoder">
    <img src="https://badgen.net/bundlephobia/tree-shaking/@alessiofrittoli/crypto-encoder" alt="Tree shakable"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/sponsors/alessiofrittoli">
    <img src="https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2" alt="Fund this package"/>
  </a>
</p>

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

### Table of Contents

- [Getting started](#getting-started)
- [Development](#development)
  - [Local development](#local-development)
  - [Production build](#production-build)
  - [Unit tests](#unit-tests)
    - [Run tests with coverage](#run-tests-with-coverage)
  - [Contributing](#contributing)
  - [Security](#security)
- [API Reference](#api-reference)
  - [Base32](#base32)
  - [Base64](#base64)
  - [Encoder](#encoder)
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

### Development

Run the following to start development

```shell
nvm use

pnpm i
```

#### Local development

Run the following

```shell
pnpm dev
```

This will generate unminified output code, sourcemaps and will enable source file watcher.

---

#### Production build

Run the following to create a local production build

```shell
pnpm build
```

This will generate minified output code without sourcemaps.

---

#### Unit tests

Run all the defined test suites by running the following:

```shell
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

---

##### Run tests with coverage

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```shell
pnpm test:coverage:serve
```

---

#### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

#### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

---

### API Reference

#### Supported input data types

This module supports different input data types and it uses the `coerceToUint8Array` utility function from [`@alessiofrittoli/crypto-buffer`](https://npmjs.com/package/@alessiofrittoli/crypto-buffer) to convert it to a `Uint8Array`.

See [`CoerceToUint8ArrayInput`](https://npmjs.com/package/@alessiofrittoli/crypto-buffer#input-type-1) for a list of supported input data types.

#### Base32

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

##### Static Properties

###### `Base32.VARIANT`

An object containing the available Base32 variants:

```ts
Base32.VARIANT = {
  RFC3548: 'RFC3548',
  RFC4648: 'RFC4648',
  RFC4648_HEX: 'RFC4648-HEX',
  Crockford: 'Crockford',
}
```

##### Static Methods

###### `Base32.encode()`

Encodes data to a Base32 string.

###### Parameters

| Parameter         | Type                      | Description                                                                                                          |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `data`            | `CoerceToUint8ArrayInput` | The data to encode. See the [list of supported input data types](#supported-input-data-types).                       |
| `variant`         | `Variant`                 | The Base32 variant to use.                                                                                           |
| `options`         | `EncodeOptions`           | (Optional) Encoding options.                                                                                         |
| `options.padding` | `boolean`                 | If set, forcefully enable or disable padding. The default behavior is to follow the default of the selected variant. |

###### Returns

Type: `string`

A Base32 encoded string.

###### Example usage

```ts
// or
import { Base32 } from '@alessiofrittoli/crypto-encoder/Base32'
import { Base32 } from '@alessiofrittoli/crypto-encoder'

console.log(Base32.encode('some value', 'RFC3548'))
// or
console.log(Base32.encode('some value', Base32.VARIANT.RFC3548))
// Outputs: 'ONXW2ZJAOZQWY5LF'
```

---

###### `Base32.decode()`

Decodes a Base32 data.

###### Parameters

| Parameter | Type                      | Description                                                                                         |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| `data`    | `CoerceToUint8ArrayInput` | The Base32-encoded data. See the [list of supported input data types](#supported-input-data-types). |
| `variant` | `Variant`                 | The Base32 variant used to encode the input.                                                        |

###### Returns

Type: `Uint8Array`

An `Uint8Array` containing the decoded data.

###### Example usage

```ts
// or
import { Base32 } from '@alessiofrittoli/crypto-encoder/Base32'
import { Base32 } from '@alessiofrittoli/crypto-encoder'

const input = 'ONXW2ZJAOZQWY5LF'
const decoded = Base32.decode(input, 'RFC3548')
// or
const decoded = Base32.decode(input, Base32.VARIANT.RFC3548)

console.log(Buffer.from(decoded).toString()) // Node.js
// or
console.log(new TextDecoder().decode(decoded)) // client-side
// or
console.log(Base32.toString(decoded)) // Node.js + client-side
// Outputs: 'some value'
```

</details>

---

#### Base64

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

##### Static Methods

###### `Base64.encode()`

Encodes data to a Base64 or Base64url string.

###### Parameters

| Parameter   | Type                      | Default | Description                                                                                    |
| ----------- | ------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `data`      | `CoerceToUint8ArrayInput` | -       | The data to encode. See the [list of supported input data types](#supported-input-data-types). |
| `normalize` | `boolean`                 | `true`  | Whether to normalize the output to Base64url.                                                  |

###### Returns

Type: `string`

A Base64 or Base64url encoded string.

###### Example

```ts
// or
import { Base64 } from '@alessiofrittoli/crypto-encoder/Base64'
import { Base64 } from '@alessiofrittoli/crypto-encoder'

const data = 'Hello, World!'
const base64 = Base64.encode(data, false)
const base64url = Base64.encode(data)

console.log(base64) // Outputs: 'SGVsbG8sIFdvcmxkIQ=='
console.log(base64url) // Outputs: 'SGVsbG8sIFdvcmxkIQ'
```

---

###### `Base64.decode()`

Decodes a Base64 or Base64url string.

###### Parameters

| Parameter | Type                      | Description                                                                                                      |
| --------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `data`    | `CoerceToUint8ArrayInput` | The Base64 or Base64url encoded data. See the [list of supported input data types](#supported-input-data-types). |

###### Returns

Type: `Buffer | Uint8Array`

A `Buffer` containing the decoded data.

###### Example

```ts
// or
import { Base64 } from '@alessiofrittoli/crypto-encoder/Base64'
import { Base64 } from '@alessiofrittoli/crypto-encoder'

const base64 = 'SGVsbG8sIFdvcmxkIQ=='
const base64url = 'SGVsbG8sIFdvcmxkIQ'

console.log(Base64.toString(Base64.decode(base64)))
// or
console.log(Base64.toString(Base64.decode(base64url)))
// Outputs: 'Hello, World!'
```

</details>

---

#### Encoder

The `Encoder` class provides static methods for encoding and decoding data using various encoding schemes, including custom ones like `base32`.

<details>

<summary>API Reference</summary>

##### **Types**

###### `Encoding`

Represents the encoding types supported by the `Encoder` class. Includes all standard `BufferEncoding` types as well as the custom `base32` encoding.

##### Static Properties

###### `Encoder.SUPPORTED_ENCODINGS`

Type: `Encoding[]`

A list of all encodings supported by the `Encoder` class. Includes standard `BufferEncoding` types and the custom `base32` encoding.

##### Static Methods

###### `Encoder.encode()`

Encodes the provided data using the specified encoding scheme.

###### Parameters

| Parameter       | Type                      | Default | Description                                                                                    |
| --------------- | ------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `data`          | `CoerceToUint8ArrayInput` | -       | The data to encode. See the [list of supported input data types](#supported-input-data-types). |
| `encoding`      | `Encoding`                | `utf8`  | (Optional) The output encoding.                                                                |
| `inputEncoding` | `Encoding`                | -       | (Optional) The encoding of the input data.                                                     |

###### Returns

Type: `string`

The encoded data as a string.

###### Behavior

- If `encoding` is `base32`, uses the [`Base32`](#base32) class with the `RFC3548` standard.
- If `encoding` is `base64` or `base64url`, uses the [`Base64`](#base64) class.
- Otherwise, falls back to `Buffer` (if available) or the `binaryToString` function for encoding.

###### Example

```ts
// or
import { Encoder } from '@alessiofrittoli/crypto-encoder/Encoder'
import { Encoder } from '@alessiofrittoli/crypto-encoder'

const data = 'Hello, world!'
const buffer = Buffer.from(data)
const bytes = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]

console.log(Encoder.encode(data, 'hex'))
console.log(Encoder.encode(data, 'base32'))
console.log(Encoder.encode(data, 'base64'))
console.log(Encoder.encode(buffer))
console.log(Encoder.encode(bytes))
```

---

###### `Encoder.decode()`

Decodes the provided data using the specified encoding scheme.

###### Parameters

| Parameter  | Type                      | Description                                                                                          |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `data`     | `CoerceToUint8ArrayInput` | The input data to decode. See the [list of supported input data types](#supported-input-data-types). |
| `encoding` | `Encoding`                | The encoding of the input data.                                                                      |

###### Returns

Type: `Buffer | Uint8Array`

A `Buffer` containing the decoded data.

###### Behavior

- If `encoding` is `base32`, uses the [`Base32`](#base32) class with the `RFC3548` standard.
- If `encoding` is `base64` or `base64url`, uses the [`Base64`](#base64) class.
- Otherwise, falls back to `Buffer` (if available) or coerces the input data to a `Uint8Array`.

###### Example

```ts
// or
import { Encoder } from '@alessiofrittoli/crypto-encoder/Encoder'
import { Encoder } from '@alessiofrittoli/crypto-encoder'

const decoded = Encoder.decode('JBSWY3DPFQQHO33SNRSCC===', 'base32')
console.log(Encoder.toString(decoded)) // Outputs: 'Hello, world!'
```

</details>

---

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
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
