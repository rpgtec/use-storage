import { useState, useEffect, useCallback } from 'react'
import { ObjectStorage, JSONStorage } from './storage'

const storageEnabled = navigator.cookieEnabled

const defaultStorage = new ObjectStorage()
const lsStorage = storageEnabled ? new JSONStorage(localStorage) : new ObjectStorage()
const ssStorage = storageEnabled ? new JSONStorage(sessionStorage) : new ObjectStorage()

if (storageEnabled) {
  window.addEventListener('storage', ({ key, newValue, storageArea }) => {
    const storage = storageArea === lsStorage.storage ? lsStorage : ssStorage
    if (!storage.et) return
    try {
      const value = JSON.parse(newValue)
      storage.et.dispatchEvent(new CustomEvent(key, { detail: { value } }))
    } catch {}
  })
}

export const useStorage = (key, initialState, storage = defaultStorage) => {
  const [value, _setValue] = useState(() => getStorage(key, initialState, storage))
  const setValue = useCallback(value => setStorage(key, value, storage), [key, storage])

  useEffect(() => {
    const onchange = event => _setValue(event.detail.value)
    storage.et = storage.et || new EventTarget()
    storage.et.addEventListener(key, onchange)
    return () => storage.et.removeEventListener(key, onchange)
  }, [key, storage])

  return [value, setValue]
}

export const getStorage = (key, initialState, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')

  const value = storage.get(key)
  if (value !== undefined) return value
  if (initialState === undefined) return undefined
  return storage.set(key, initialState instanceof Function ? initialState() : initialState)
}

export const setStorage = (key, value, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')

  const newValue = value instanceof Function ? value(storage.get(key)) : value
  const returnValue = storage.set(key, newValue)
  storage.et && storage.et.dispatchEvent(new CustomEvent(key, { detail: { value: returnValue } }))
}

export const useLocalStorage = (key, initialState) => useStorage(key, initialState, lsStorage)
export const getLocalStorage = (key, initialState) => getStorage(key, initialState, lsStorage)
export const setLocalStorage = (key, value) => setStorage(key, value, lsStorage)

export const useSessionStorage = (key, initialState) => useStorage(key, initialState, ssStorage)
export const getSessionStorage = (key, initialState) => getStorage(key, initialState, ssStorage)
export const setSessionStorage = (key, value) => setStorage(key, value, ssStorage)
