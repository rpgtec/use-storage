import React from 'react'
import ReactDOM from 'react-dom'

import MakeStateShareable from './MakeStateShareable'
import MakeStatePersistent from './MakeStatePersistent'
import MakeStateAccessible from './MakeStateAccessible'

ReactDOM.render(
  <React.StrictMode>
    <MakeStateShareable title="Make State Shareable" />
    <MakeStatePersistent title="Make State Persistent" />
    <MakeStateAccessible title="Make State Accessible" />
  </React.StrictMode>,
  document.getElementById('root')
)
