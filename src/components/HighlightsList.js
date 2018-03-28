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
import grey from "material-ui/colors/grey";

// ===== MATERIAL-UI COLOR IMPORTS yellow, blue, green, pink, purple ===== //
import { colorLabels } from "../config/colorLabels";

/*---Displays a list of Highlights ---*/
const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center"
  },
  checkbox: {
    marginRight: "20px"
  },
  allCheckbox: {
    marginLeft: "10px",
    color: "white",
    backgroundColor: grey["A100"]
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
    const { classes, checkbox, allCheckbox } = this.props;
    return (
      <div>
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          className={classes.checkbox}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc1.active,
            color: "white"
          }}
        />
        <Checkbox
          className={classes.checkbox}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc2.active,
            color: "white"
          }}
        />
        <Checkbox
          className={classes.checkbox}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc3.active,
            color: "white"
          }}
        />
        <Checkbox
          className={classes.checkbox}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc4.active,
            color: "white"
          }}
        />
        <Checkbox
          className={classes.checkbox}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc5.active,
            color: "white"
          }}
        />
        Select All
        <Checkbox className={classes.allCheckbox} label="all" disableRipple />
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
