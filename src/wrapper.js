export class ObjectStorage {
  constructor(storage) {
    this.storage = storage
    this.eventTarget = new EventTarget()
  }
  get(key) {
    return this.storage[key]
  }
  set(key, value) {
    if (value === undefined) {
      delete this.storage[key]
    } else {
      this.storage[key] = value
    }
    return value
  }
}

export class StorageStorage {
  constructor(storage) {
    this.storage = storage
    this.eventTarget = new EventTarget()
  }
  get(key) {
    const value = this.storage[key]
    if (value) {
      try {
        return JSON.parse(value)
      } catch {}
    }
  }
  set(key, value) {
    if (value === undefined) {
      delete this.storage[key]
    } else {
      this.storage[key] = JSON.stringify(value)
    }
    return value
  }
}
