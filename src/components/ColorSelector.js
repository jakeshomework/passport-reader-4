import React, { Component } from "react";
import PropTypes from "prop-types";
import LabelIcon from "material-ui-icons/Label";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

// ===== MATERIAL-UI COLOR IMPORTS ===== //
import lightBlue from "material-ui/colors/lightBlue";
import lightGreen from "material-ui/colors/lightGreen";
import pink from "material-ui/colors/pink";
import purple from "material-ui/colors/purple";
import yellow from "material-ui/colors/yellow";
import grey from "material-ui/colors/grey";
/* ----- COMPONENT IMPORTS ----- */

/*---Render color selector inside annotation modal---*/
const colorLabels = {
  yellow: {
    label: "Main Concept",
    active: yellow["500"],
    inactive: yellow["500"]
  },
  green: {
    label: "Supporting Idea",
    active: lightGreen["A700"],
    inactive: lightGreen["A700"]
  },
  blue: {
    label: "Vocabulary",
    active: lightBlue["A100"],
    inactive: lightBlue["A100"]
  },
  pink: {
    label: "Character Detail",
    active: pink["A100"],
    inactive: pink["A100"]
  },
  purple: {
    label: "Question",
    active: purple["A100"],
    inactive: purple["A100"]
  }
};

const colorLabelsArray = Object.keys(colorLabels);

const styles = {
  root: {
    maxWidth: 350
  },
  labelHeader: {
    height: 15,
    marginTop: 10
  },
  color: {
    padding: 10,
    minWidth: 20
  }
};

const activeStyles = {};

const inActiveStyles = {};

class ColorSelector extends Component {
  state = {
    label: ""
  };

  handleMouseOver = color => {
    this.setState({ label: colorLabels[color].label });
  };

  handleMouseOut = () => {
    this.setState({ label: "" });
  };

  render() {
    const { handleClick, current, classes } = this.props;

    return (
      <div>
        <Typography align="center" className={classes.labelHeader}>
          {this.state.label}
        </Typography>
        <BottomNavigation
          value={current ? current : "none"}
          className={classes.root}
        >
          {colorLabelsArray.map((color, index) => (
            <BottomNavigationAction
              label={colorLabels[color].label}
              className={classes.color}
              value={color}
              icon={<LabelIcon className={classes.icon} />}
              style={
                current === color ? (
                  { color: colorLabels[color].active, ...activeStyles }
                ) : (
                  { color: colorLabels[color].inactive, ...inActiveStyles }
                )
              }
              onClick={() => {
                handleClick(color);
              }}
              onMouseOver={() => this.handleMouseOver(color)}
              onMouseOut={this.handleMouseOut}
              key={index}
            />
          ))}
        </BottomNavigation>
      </div>
    );
  }
}

ColorSelector.propTypes = {
  updateHighlight: PropTypes.func
};

export default withStyles(styles)(ColorSelector);
