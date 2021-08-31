import { useStorage } from '@rpgtec/use-storage'

function ComponentA() {
  const [query, setQuery] = useStorage('query', '')
  return (
    <input
      value={query}
      onChange={event => setQuery(event.target.value)}
      placeholder="ComponentA"
    />
  )
}

function ComponentB() {
  const [query, setQuery] = useStorage('query', '')
  return (
    <input
      value={query}
      onChange={event => setQuery(event.target.value)}
      placeholder="ComponentB"
    />
  )
}

export default function MakeShareableState({ title }) {
  return (
    <section>
      <h1>{title}</h1>
      <ComponentA />
      <ComponentB />
    </section>
  )
}
