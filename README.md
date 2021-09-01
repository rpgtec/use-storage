# @rpgtec/use-storage
1. [`Make state shareable` without using context](#1-make-state-shareable-without-using-context)
4. [`Make state persistent` using localStorage](#2-make-state-persistent-using-localstorage)
2. [`Make state accessible` without re-rendering component](#3-make-state-accessible-without-re-rendering-component)
3. [`Make state extensible` using your own custom storage](#4-make-state-extensible-using-your-own-custom-storage)

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
| storage      | `object` | **\[Optional\]**<br>default storage is a wrapper of simple object in memory.<br>You can also use your own [custom storage](#4-use-your-own-custom-storage-advanced-usage). |

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

### 2. `Make state persistent` using localStorage

```jsx
import { useLocalStorage } from '@rpgtec/use-storage'

function ComponentA() {
  // To make a persistent state, use useLocalStorage instead of useStorage
  const [query, setQuery] = useLocalStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}

function ComponentB() {
  // A persistent state is also synchronized with the state of the same key
  // And, state is remembered even if you reload
  const [query, setQuery] = useLocalStorage('query', '')
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```

### 3. `Make state accessible` without re-rendering component

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

### 4. `Make state extensible` using your own custom storage

```jsx
import { useStorage } from '@rpgtec/use-storage'

// Storage must have get / set methods
const numberOnlyStorage = (obj => ({
  get: key => {
    return obj[key]
  },
  set: (key, value) => {
    // Convert value to numbers only!
    obj[key] = (value || '0').replace(/[^0-9]/g, '').replace(/^0+([0-9])/, '$1')
    return obj[key]
  },
}))({})

function Component() {
  const [query, setQuery] = useStorage('query', '', numberOnlyStorage)
  return <input value={query} onChange={event => setQuery(event.target.value)} />
}
```

---
Happy hacking!
