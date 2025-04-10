import React from 'react'
import { createRoot } from 'react-dom/client'

import MakeStateShareable from './MakeStateShareable'
import MakeStatePersistent from './MakeStatePersistent'
import MakeStateAccessible from './MakeStateAccessible'
import MakeStateExtensible from './MakeStateExtensible'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MakeStateShareable title="Make State Shareable" />
    <MakeStatePersistent title="Make State Persistent" />
    <MakeStateAccessible title="Make State Accessible" />
    <MakeStateExtensible title="Make State Extensible" />
  </React.StrictMode>,
)
