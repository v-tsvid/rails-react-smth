import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LeftDrawer from "./LeftDrawer";

const App = (props) => (
  <div>
    <Router startingLineId={props.startingLineId}>
      <div>
        <Route
          path='/'
          startingLineId={props.startingLineId}
          render={(routeProps) =>
            <LeftDrawer {...props} {...routeProps} />}
        />
      </div>
    </Router>
  </div>
)

export default App