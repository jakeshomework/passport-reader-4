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

// ===== MATERIAL-UI COLOR IMPORTS yellow, blue, green, pink, purple ===== //
import { colorLabels } from "../config/colorLabels";

/*---Displays a list of Highlights ---*/
const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center"
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
    const { classes } = this.props;
    return (
      <div>
        <Checkbox
          //checked={this.state.checked.indexOf(value) !== -1}
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc1.active,
            color: "white"
          }}
        />
        <Checkbox
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc2.active,
            color: "white"
          }}
        />
        <Checkbox
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc3.active,
            color: "white"
          }}
        />
        <Checkbox
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc4.active,
            color: "white"
          }}
        />
        <Checkbox
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc5.active,
            color: "white"
          }}
        />
        <Checkbox
          label="all"
          disableRipple
          style={{
            backgroundColor: colorLabels.hlc6.active,
            color: "white"
          }}
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
