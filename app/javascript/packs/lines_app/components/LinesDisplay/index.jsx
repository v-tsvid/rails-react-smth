import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

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
      this.lineId = 80545;
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
      <div>
        {previousLineId &&
        <Link to={`/?line=${previousLineId}`}>
          Previous
        </Link>
        }
        {nextLineId &&
        <Link to={`/?line=${nextLineId}`}>
          Next
        </Link>
        }
        <p>{line.text}</p>
        <p>{line.author}</p>
      </div>
    );
  }
}

export default LinesDisplay;