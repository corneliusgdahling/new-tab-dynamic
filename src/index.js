import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './components/App/App'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root'),
  injectTapEventPlugin(),
)
