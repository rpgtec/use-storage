import { useState, useEffect, useCallback } from 'react'
import { ObjectStorage, StorageStorage } from './wrapper'

const defaultStorage = new ObjectStorage({})

const storageEnabled = navigator.cookieEnabled
const lsStorage = storageEnabled ? new StorageStorage(localStorage) : new ObjectStorage({})
const ssStorage = storageEnabled ? new StorageStorage(sessionStorage) : new ObjectStorage({})

if (storageEnabled) {
  window.addEventListener('storage', event => {
    const storage = event.storageArea === lsStorage.storage ? lsStorage : ssStorage
    const value = JSON.parse(event.newValue)
    storage.eventTarget.dispatchEvent(new CustomEvent(event.key, { detail: { value } }))
  })
}

export const useStorage = (key, initialState, storage = defaultStorage) => {
  const [value, _setValue] = useState(() => getStorage(key, initialState, storage))
  const setValue = useCallback(value => setStorage(key, value, storage), [key, storage])

  useEffect(() => {
    const onchange = event => _setValue(event.detail.value)
    storage.eventTarget.addEventListener(key, onchange)
    return () => storage.eventTarget.removeEventListener(key, onchange)
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

  if (value instanceof Function) value = value(storage.get(key))
  storage.set(key, value)
  storage.eventTarget.dispatchEvent(new CustomEvent(key, { detail: { value } }))
}

export const useLocalStorage = (key, initialState) => useStorage(key, initialState, lsStorage)
export const getLocalStorage = (key, initialState) => getStorage(key, initialState, lsStorage)
export const setLocalStorage = (key, value) => setStorage(key, value, ls)

export const useSessionStorage = (key, initialState) => useStorage(key, initialState, ssStorage)
export const getSessionStorage = (key, initialState) => getStorage(key, initialState, ssStorage)
export const setSessionStorage = (key, value) => setStorage(key, value, ssStorage)
