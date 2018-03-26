import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import Highlight from "./Highlight";
import { withStyles } from "material-ui/styles";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";

/*---Displays a list of Highlights---*/
const styles = theme => ({
  root: {
    width: "100%"
  }
});
class HighlightsList extends Component {
  state = {
    checked: [0]
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const classes = this.props;
    return (
      <List>
        {[0, 1, 2, 3].map(value => (
          <ListItem
            key={value}
            role={undefined}
            dense
            button
            onClick={this.handleToggle(value)}
            className={classes.listItem}
          >
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              color="primary"
            />
            {/* <ListItemText primary={`highlight ${value` + 1}`} /> */}
            <Highlight listItem={this.props.filteredList} />
          </ListItem>
        ))}
      </List>
    );
  }
}

HighlightsList.propTypes = {
  filteredList: PropTypes.array
};

export default withStyles(styles)(HighlightsList);
