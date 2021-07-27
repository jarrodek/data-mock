# Data mock

A data generation library that helps mocking different schemes.

> This is a work in progress.

## Usage

### Installation

```sh
npm install --save @pawel-up/data-mock
```

### Origin

This library started as a fork and a combination of two other great libraries: chance.js and faker.js. The basic data generation part is based on the two libraries. The difference is that this library is an ES module and it's goal is to mock well defined data structures.

### When to use?

Most likely you want to use any of the original libraries as they have a getter support and community. This can be a **not** in-drop replacement if you need support for ESM. Also this project aims to generate mocked schemas and not just random basic values.

## Development

```sh
git clone https://github.com/jarrodek/data-mock
cd api-documentation
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
