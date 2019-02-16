# useProState

Use `useState` in a more OOP way.

## Install

```bash
$ yarn add use-pro-state
```

or

```bash
$ npm i use-pro-state
```

## Usage

### `useProState(obj)`

`useProState` can accept an plain object or array, and return a delegated object or array. Use it as what is passed into `useProState` (it's a ES2015 `Proxy` object).

### `obj.$()`

the delegated object has a function called `$`, it will directly invoke the set function from `useState`. So use it in the way you use the set function from `useState`

## Example

```jsx
import useProState from 'use-pro-state'

const App = () => {
  const david = {
    name: 'David',
    pets: {
      dogs: ['Leo', 'Lucky'],
      cats: []
    }
  }
  const davidPro = useProState(david)

  return (
    <div>
      <p>{`${davidPro.name} lives with ${davidPro.pets.dogs.length + davidPro.pets.cats.length} pets`}</p>
      <button
        onClick={() => {
          davidPro.pets.cats.push('Lisa')
          davidPro.$()
        }}
      >
        Add a cat
      </button>
    </div>
  )
}
```

## TODO

- [ ] add test
- [ ] deal with edge case
- [ ] Support ES6 `Set` and `Map`

## License

MIT
