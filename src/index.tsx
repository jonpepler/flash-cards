import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { theme } from 'theme'
import { App } from './App'
import { ThemeProvider } from 'styled-components'
import { SetsProvider } from 'contexts'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SetsProvider>
        <App />
      </SetsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
