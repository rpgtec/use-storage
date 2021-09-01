import React from 'react'
import ReactDOM from 'react-dom'

import MakeStateShareable from './MakeStateShareable'
import MakeStatePersistent from './MakeStatePersistent'
import MakeStateAccessible from './MakeStateAccessible'
import MakeStateExtensible from './MakeStateExtensible'

ReactDOM.render(
  <React.StrictMode>
    <MakeStateShareable title="Make State Shareable" />
    <MakeStatePersistent title="Make State Persistent" />
    <MakeStateAccessible title="Make State Accessible" />
    <MakeStateExtensible title="Make State Extensible" />
  </React.StrictMode>,
  document.getElementById('root')
)
