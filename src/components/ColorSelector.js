import React, { Component } from "react";
import PropTypes from "prop-types";

// ----- MATERIAL-UI IMPORTS ----- //
import LabelIcon from "material-ui-icons/Label";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import grey from "material-ui/colors/grey";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

/* ----- COMPONENT IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";

const colorLabelsArray = Object.keys(colorLabels);

// remove the extra color label that's used for audio
colorLabelsArray.pop();

const styles = {
  root: {
    maxWidth: 350
  },
  labelHeader: {
    minHeight: 30,
    marginTop: 10,
    backgroundColor: grey[50],
    width: "100%",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "inset 0px 1px 5px 0px rgba(0, 0, 0, 0.2), inset 0px 2px 2px 0px rgba(0, 0, 0, 0.14), inset 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  colors: {
    maxWidth: 350,
    borderRadius: "10px"
  },
  color: {
    padding: 10,
    minWidth: 20
  },
  tooltipTitle: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px"
  }
};

const activeStyles = {};

const inActiveStyles = {};

class ColorSelector extends Component {
  state = {
    label: "---"
  };

  handleMouseOver = color => {
    this.setState({ label: colorLabels[color].label });
  };

  handleMouseOut = () => {
    this.setState({ label: "---" });
  };

  handleCancel = () => {
    this.props.closeTooltip();
  };

  render() {
    const { handleClick, current, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.tooltipTitle}>
          <Typography align="center" className={classes.labelHeader}>
            {this.state.label}
          </Typography>
          <IconButton className={classes.button} onClick={this.handleCancel}>
            <CloseIcon />
          </IconButton>
        </div>

        <BottomNavigation
          value={current ? current : "none"}
          className={classes.colors}
        >
          {colorLabelsArray.map((color, index) => (
            <BottomNavigationAction
              label={colorLabels[color].label}
              className={classes.color}
              value={color}
              icon={<LabelIcon className={classes.icon} />}
              style={
                current === color
                  ? { color: colorLabels[color].active, ...activeStyles }
                  : { color: colorLabels[color].inactive, ...inActiveStyles }
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
