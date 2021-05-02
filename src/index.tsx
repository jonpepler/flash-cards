import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { SetsProvider } from 'contexts'

ReactDOM.render(
  <React.StrictMode>
    <SetsProvider>
      <App />
    </SetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
