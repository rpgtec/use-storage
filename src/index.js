import { useState, useEffect, useCallback } from 'react'

const defaultStorage = {}

export const useStorage = (key, initialState, storage) => {
  const [value, _setValue] = useState(() => getStorage(key, initialState, storage))
  const setValue = useCallback(value => setStorage(key, value, storage), [key, storage])

  useEffect(() => {
    const onchange = event => _setValue(event.detail.value)
    const onstorage = event => event.key === key && _setValue(JSON.parse(event.newValue))

    window.addEventListener('rns:' + key, onchange)
    if (storage instanceof Storage) window.addEventListener('storage', onstorage)

    return () => {
      window.removeEventListener('rns:' + key, onchange)
      if (storage instanceof Storage) window.removeEventListener('storage', onstorage)
    }
  }, [key, storage])

  return [value, setValue]
}

export const getStorage = (key, initialState, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')
  const value = storage[key]
  if (value !== undefined) {
    try {
      return storage instanceof Storage ? JSON.parse(value) : value
    } catch (error) {}
  }
  if (initialState !== undefined) {
    const value = initialState instanceof Function ? initialState() : initialState
    storage[key] = storage instanceof Storage ? JSON.stringify(value) : value
    return value
  }
}

export const setStorage = (key, value, storage = defaultStorage) => {
  if (typeof key !== 'string' || key === '') throw new TypeError('key is required')
  if (value instanceof Function) {
    let currentValue
    try {
      currentValue = storage instanceof Storage ? JSON.parse(storage[key]) : storage[key]
    } catch (error) {}
    value = value(currentValue)
  }
  storage[key] = storage instanceof Storage ? JSON.stringify(value) : value
  window.dispatchEvent(new CustomEvent('rns:' + key, { detail: { value } }))
}

export const useLocalStorage = (key, initialState) => useStorage(key, initialState, localStorage)
export const getLocalStorage = (key, initialState) => getStorage(key, initialState, localStorage)
export const setLocalStorage = (key, value) => setStorage(key, value, localStorage)

export const useSessionStorage = (key, initialState) => useStorage(key, initialState, sessionStorage)
export const getSessionStorage = (key, initialState) => getStorage(key, initialState, sessionStorage)
export const setSessionStorage = (key, value) => setStorage(key, value, sessionStorage)
