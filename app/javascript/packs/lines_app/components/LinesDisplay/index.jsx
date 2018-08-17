import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Line from '../Line/'

class LinesDisplay extends React.Component {
  constructor () {
    super();
    this.state = {
      line: {}
    };
  }

  fetchLine (id) {
    axios.get( `api/lines/${id}` )
      .then(response => {
        this.setState({ line: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setLineIdFromQueryString (qs) {
    this.qsParams = queryString.parse(qs);
    if (this.qsParams.line) {
      // assign line ID from the URL's query string
      this.lineId = Number(this.qsParams.line);
    } else {
      this.lineId = this.props.startingLineId;
      // update URL in browser to reflect current line in query string
      this.props.history.push(`/?line=${this.lineId}`);
    }
  }

  componentDidMount () {
    this.setLineIdFromQueryString(this.props.location.search);
    this.fetchLine(this.lineId);
  }

  componentWillReceiveProps (nextProps) {
    this.setLineIdFromQueryString(nextProps.location.search);
    this.fetchLine(this.lineId);
  }

  render () {
    const line = this.state.line;
    const nextLineId = line.next_id;
    const previousLineId = line.previous_id;

    return (
      <div className="line-display-container">
        <div className="inline-block">
          {
            previousLineId && <Button variant="contained" component={Link} to={`/?line=${previousLineId}`} color="primary">
              Previous
            </Button>
          }
        </div>
        <div className="inline-block"><Line line={line}/></div>
        <div className="inline-block">
          {
            nextLineId && <Button className="inline-button" variant="contained" component={Link} to={`/?line=${nextLineId}`} color="primary">
                Next
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default LinesDisplay;