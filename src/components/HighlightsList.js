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
import Paper from "material-ui/Paper";

// ===== MATERIAL-UI COLOR IMPORTS ===== //
import lightBlue from "material-ui/colors/lightBlue";
import lightGreen from "material-ui/colors/lightGreen";
import pink from "material-ui/colors/pink";
import purple from "material-ui/colors/purple";
import yellow from "material-ui/colors/yellow";
import grey from "material-ui/colors/grey";

/*---Displays a list of Highlights---*/
const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center"
  },
  yellow: {
    backgroundColor: yellow["500"]
  },
  green: {
    backgroundColor: lightGreen["A700"]
  },
  blue: {
    backgroundColor: lightBlue["A100"]
  },
  pink: {
    backgroundColor: pink["A100"]
  },
  purple: {
    backgroundColor: purple["A100"]
  }
});

class HighlightsList extends Component {
  state = {
    checked: []
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
      <div>
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
          color={classes.yellow}
        />
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
          className={classes.yellow}
        />
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          tabIndex={-1}
          disableRipple
        />
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

              <ListItemText primary={`Highlight ${value + 1}`} />
              <Highlight listItem={this.props.filteredList} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

HighlightsList.propTypes = {
  filteredList: PropTypes.array
};

export default withStyles(styles)(HighlightsList);
