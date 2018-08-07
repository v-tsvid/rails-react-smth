import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'


const lines = document.querySelector('#lines')
ReactDOM.render(<App startingLineId={lines.dataset.startingLineId} />, lines )