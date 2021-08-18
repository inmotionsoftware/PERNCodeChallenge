import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import api from './api'

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App api={api} />, document.body)
})
