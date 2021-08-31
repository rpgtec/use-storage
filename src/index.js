import { useState, useEffect, useCallback } from 'react'
import { ObjectStorage, StorageStorage } from './wrapper'

const defaultStorage = new ObjectStorage({})
const lsStorage = new StorageStorage(localStorage)
const ssStorage = new StorageStorage(sessionStorage)

export const useStorage = (key, initialState, storage) => {
  const [value, _setValue] = useState(() => getStorage(key, initialState, storage))
  const setValue = useCallback(value => setStorage(key, value, storage), [key, storage])

  useEffect(() => {
    const isStorageStorage = storage instanceof StorageStorage
    const onchange = event => _setValue(event.detail.value)
    const onstorage = event => event.key === key && _setValue(JSON.parse(event.newValue))

    window.addEventListener('us:' + key, onchange)
    if (isStorageStorage) window.addEventListener('storage', onstorage)

    return () => {
      window.removeEventListener('us:' + key, onchange)
      if (isStorageStorage) window.removeEventListener('storage', onstorage)
    }
  }, [key, storage])

  return [value, setValue]
}

export const getStorage = (key, initialState, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')

  const value = storage.get(key)
  if (value !== undefined) return value

  if (initialState !== undefined) {
    const value = initialState instanceof Function ? initialState() : initialState
    storage.set(key, value)
    return value
  }
}

export const setStorage = (key, value, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')

  if (value instanceof Function) {
    value = value(storage.get(key))
  }
  storage.set(key, value)
  window.dispatchEvent(new CustomEvent('us:' + key, { detail: { value } }))
}

export const useLocalStorage = (key, initialState) => useStorage(key, initialState, lsStorage)
export const getLocalStorage = (key, initialState) => getStorage(key, initialState, lsStorage)
export const setLocalStorage = (key, value) => setStorage(key, value, ls)

export const useSessionStorage = (key, initialState) => useStorage(key, initialState, ssStorage)
export const getSessionStorage = (key, initialState) => getStorage(key, initialState, ssStorage)
export const setSessionStorage = (key, value) => setStorage(key, value, ssStorage)
