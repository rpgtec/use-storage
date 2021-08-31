import { useLocalStorage } from '@rpgtec/use-storage'

function ComponentA() {
  const [query, setQuery] = useLocalStorage('persistentQuery', '')
  return (
    <input
      value={query}
      onChange={event => setQuery(event.target.value)}
      placeholder="ComponentA"
    />
  )
}

function ComponentB() {
  const [query, setQuery] = useLocalStorage('persistentQuery', '')
  return (
    <input
      value={query}
      onChange={event => setQuery(event.target.value)}
      placeholder="ComponentB"
    />
  )
}

export default function MakePersistentState({ title }) {
  return (
    <section>
      <h1>{title}</h1>
      <ComponentA />
      <ComponentB />
      <button onClick={() => window.location.reload()}>
        Page Reload (state is remembered)
      </button>
    </section>
  )
}
