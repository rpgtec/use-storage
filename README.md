# @rpgtec/use-storage
1. [`Make state shareable` without using context](#1-make-state-shareable-without-using-context)
2. [`Make state accessible` without re-rendering component](#2-make-state-accessible-without-re-rendering-component)
3. [`Make state extensible` using localStorage / sessionStorage (or your own storage)](#3-make-state-extensible-using-localstorage--sessionstorage)

## Demo

[![CodeSandbox Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/rpgtec/use-storage/tree/main/examples/?file=/src/index.js)

## Installation

```sh
# Using npm
npm i -S @rpgtec/use-storage
# Using yarn
yarn add @rpgtec/use-storage
```

## Quick Start

``` js
import { useLocalStorage, setLocalStorage } from '@rpgtec/use-storage'

function App() {
  // Set the key name as the first argument
  const [count, setCount] = useLocalStorage('count', 0)
  return (
    <div>
      {/* Usage is almost the same as setState */}
      <div>count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      {/* The state is remembered even if you reload */}
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

// You can access the state without dependencies
setInterval(() => setLocalStorage('count', x => x + 1), 1000)
```

## Interface

```js
const [state, setState] = useStorage(key, initialState, storage)
```

### Returned value

The usage of `state` and `setState` is almost the same as that of `useState`

### Arguments

| name         | type     | description |
| ------------ | :------: | ----------- |
| key          | `string` | Set a key name to identify what the state is.<br>Synchronize states with the same key. |
| initialState | `any`    | Return initialState when the state is undefined.<br>If initialState is a `function`, return the result of the function call. |
| storage      | `object` | **\[Optional\]** default storage is a simple object in memory.<br>You can pass any object that has property access.<br>For example, use localStorage to create a persistent state. |

## API

```js
useStorage(key, initialState, storage)
getStorage(key, initialState, storage)
setStorage(key, value, storage)
```
```js
useLocalStorage(key, initialState)
getLocalStorage(key, initialState)
setLocalStorage(key, value)
```
```js
useSessionStorage(key, initialState)
getSessionStorage(key, initialState)
setSessionStorage(key, value)
```

## Usage

### 1. `Make state shareable` without using context

```jsx
import { useStorage } from '@rpgtec/use-storage'

function ComponentA() {
  // Set the key name as the first argument
  const [query, setQuery] = useStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}

function ComponentB() {
  // Synchronize states with the same key
  const [query, setQuery] = useStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```

### 2. `Make state accessible` without re-rendering component

```jsx
import { useStorage, setStorage, getStorage } from '@rpgtec/use-storage'

function CountView() {
  console.log('Render: CountView') //=> re-render when the count is updated
  const [count] = useStorage('count', 0)
  return <div>count: {count}</div>
}

// No need to re-render this component when the count is updated.
// So, use setStorage / getStorage instead of useStorage.
function CountTool() {
  console.log('Render: CountTool') //=> only first rendering
  return (
    <div>
      <button onClick={() => setStorage('count', x => x + 1)}>count up</button>
      <button onClick={() => setStorage('count', 0)}>count reset</button>
      <button onClick={() => console.log(getStorage('count'))}>get count</button>
    </div>
  )
}
```

### 3. `Make state extensible` using localStorage / sessionStorage

```jsx
import { useStorage, useLocalStorage } from '@rpgtec/use-storage'

function ComponentA() {
  // Make a persistent state
  const [query, setQuery] = useLocalStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}

function ComponentB() {
  // Synchronize states with the same key
  // And, state is remembered even if you reload
  const [query, setQuery] = useLocalStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```

You can also use your own custom storage! (advanced usage)

<details>
<summary>Sample Code</summary>

```js
import { useStorage } from '@rpgtec/use-storage'

// Storage must have get / set methods
const customStorage = (obj => ({
  get: key => {
    console.log('get', key) // do something
    return obj[key]
  },
  set: (key, value) => {
    console.log('set', key, value) // do something
    storage[key] = value
    return value
  }
}))({})

function Component() {
  const [query, setQuery] = useStorage('query', '', customStorage)
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```
</details>

---
Happy hacking!
