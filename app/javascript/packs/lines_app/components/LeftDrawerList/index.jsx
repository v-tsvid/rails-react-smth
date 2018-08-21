import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import axios from "axios";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class LeftDrawerList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      seasons: {},
      episodes: {},
      open: '1',
    };
  }

  fetchSeasons = () => {
    axios.get( `api/seasons` )
      .then(response => {
        this.setState({ seasons: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchEpisodes = () => {
    axios.get( `api/episodes` )
      .then(response => {
        this.setState({ episodes: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount () {
    this.fetchSeasons();
    this.fetchEpisodes();
  }

  // componentWillReceiveProps (nextProps) {
  //   this.fetchSeasons();
  //   this.fetchEpisodes();
  // }

  handleClick = (num) => {
    this.setState({ open: (this.state.open == num ? '0' : num) });
  };

  seasonListItems() {
    const { seasons } = this.state
    let listItems = []

    {Object.keys(seasons).map((key) =>
      listItems.push(
        <div key={'s' + seasons[key]}>
          <ListItem key={'s' + seasons[key]} button onClick={() => this.handleClick(seasons[key])} >
            <ListItemIcon>
              <SendIcon/>
            </ListItemIcon>
            <ListItemText inset primary={'Season ' + seasons[key]}/>
          </ListItem>
          {this.episodeListItems(key)}
        </div>
      )
    )}

    return (listItems)
  }

  episodeListItems(key) {
    const { seasons, episodes } = this.state
    const { classes } = this.props;
    let listItems = []

    {episodes[key] && episodes[key].map((episode) =>
      listItems.push(
        <Collapse key={'s' + seasons[key] + 'e' + episode[1]} in={this.state.open == seasons[key]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary={'Episode ' + episode[1]} />
            </ListItem>
          </List>
        </Collapse>
      )
    )}

    return (listItems)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          {this.seasonListItems()}
        </List>
      </div>
    );
  }
}

LeftDrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftDrawerList);