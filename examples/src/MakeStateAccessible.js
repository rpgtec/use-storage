import { useStorage, setStorage, getStorage } from '@rpgtec/use-storage'

function CountView() {
  console.log('CountView is rendered')
  const [count] = useStorage('count', 0)
  return <input value={'count => ' + count} disabled />
}

function CountTool() {
  console.log('CountTool is rendered only the first time')
  return (
    <>
      <button onClick={() => setStorage('count', x => x + 1)}>
        setStorage("count", x =&gt; x + 1)
      </button>
      <button onClick={() => setStorage('count', 0)}>
        setStorage("count", 0)
      </button>
      <button onClick={() => console.log(getStorage('count'))}>
        console.log(getStorage("count"))
      </button>
    </>
  )
}

export default function MakeStateAccessible({ title }) {
  return (
    <section>
      <h1>{title}</h1>
      <CountView />
      <CountTool />
    </section>
  )
}
