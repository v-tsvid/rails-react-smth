import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LinesDisplay from './LinesDisplay/'

const App = (props) => (
  <div>
      <Router startingLineId={props.startingLineId}>
        <div>
          <Route
            path='/'
            startingLineId={props.startingLineId}
            render={(routeProps) =>
                <LinesDisplay {...props} {...routeProps} />}
          />
        </div>
      </Router>
  </div>
)

// You will need this on the bottom of each component file
// to make it available through ES6 'import' statements.

export default App