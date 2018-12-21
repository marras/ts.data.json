# JsonDecoder

[![Build Status](https://travis-ci.org/joanllenas/ts.data.json.svg?branch=master)](https://travis-ci.org/joanllenas/ts.data.json)
[![npm version](https://badge.fury.io/js/ts.data.json.svg)](https://badge.fury.io/js/ts.data.json)

Typescript type annotations give us compile-time guarantees, but at run-time, when data flows from the server to our clients, lots of things can go wrong.

JSON decoders validate the JSON before it comes into our program. So if the data has an unexpected structure, we learn about it immediately.

## Install

```
npm install ts.data.json --save
```

## Example

```ts
type User = {
  firstname: string;
  lastname: string;
};

const userDecoder = JsonDecoder.object<User>(
  {
    firstname: JsonDecoder.string,
    lastname: JsonDecoder.string
  },
  'User'
);

const jsonObjectOk = {
  firstname: 'Damien',
  lastname: 'Jurado'
};

userDecoder
  .decodePromise(jsonObjectOk)
  .then(user => {
    console.log(`User ${user.firstname} ${user.lastname} decoded successfully`);
  })
  .catch(error => {
    console.log(error);
  });

// Output: User Damien Jurado decoded successfully

const jsonObjectKo = {
  firstname: 'Erik',
  lastname: null
};

userDecoder
  .decodePromise(jsonObjectKo)
  .then(user => {
    console.log('User decoded successfully');
  })
  .catch(error => {
    console.error(error);
  });

// Output: <User> decoder failed at key "lastname" with error: null is not a valid string
```

## Api

### JsonDecoder.string

`string: Decoder<string>`

Creates a `string` decoder.

```ts
JsonDecoder.string.decode('hi'); // Ok<string>({value: 'hi'})
JsonDecoder.string.decode(5); // Err({error: '5 is not a valid string'})
```

### JsonDecoder.number

`number: Decoder<number>`

Creates a `number` decoder.

```ts
JsonDecoder.number.decode(99); // Ok<number>({value: 99})
JsonDecoder.string.decode('hola'); // Err({error: 'hola is not a valid number'})
```

_(Docs are WIP)_
