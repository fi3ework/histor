# histor

histor is a enhancer to watch the deep change of an object and tell the detail of the change.

## Install

```bash
$ yarn add histor
```

or

```bash
$ npm i histor
```

## Usage

### histor(object, onChange)

Accept an object and a `onChange` callback function. The callback function will be called if any part of the object is changed.

The `onChange` callback will receive a change detail whose type is:

```ts
interface IDiff {
  path: (string | number)[] // the path chain of the changed key
  from: any // previous value before change of the prop
  to: any // current value after change of the prop
}
```

Example:

```ts
import histor from 'histor'

const person = {
  name: 'wee',
  skills: ['eat', 'sleep'],
  pets: {
    cat: {
      name: 'c1'
    },
    dog: 'd1'
  }
}

const p = histor(person, diff => {
  console.log(`$${diff.path.map(p => `[${p}]`).join('')}: ${diff.from} ==> ${diff.to}`)
})

person.pets.cat.name = 'c2'
// it will log:
// `$[pets][cat][name]: c1 ==> c2`
```

## ⚠️ CAVEAT

- The change diff will just keep a reference to the changed value. So if the new value or the new value has been changed deeply afterward. The previous diff will be changed at the same time. So it's better to serialize the diff to make it immutable.

## Thanks

Inspired by [on-change](https://github.com/sindresorhus/on-change).

## License

MIT
