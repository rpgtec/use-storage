import { useStorage } from '@rpgtec/use-storage'

// Storage must have get / set methods
const numberOnlyStorage = (obj => ({
  get: key => {
    return obj[key]
  },
  set: (key, value = '') => {
    // Convert value to numbers only!
    obj[key] = value.replace(/[^0-9]/g, '').replace(/^0+([0-9])/, '$1') || '0'
    return obj[key]
  },
}))({})

export default function MakeStateExtensible({ title }) {
  const [number, setNumber] = useStorage('number', '0', numberOnlyStorage)
  return (
    <section>
      <h1>{title}</h1>
      <input value={number} onChange={event => setNumber(event.target.value)} />
      <div>only numbers are allowed</div>
    </section>
  )
}
