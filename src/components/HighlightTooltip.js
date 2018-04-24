import React, { Component } from "react";
import PropTypes from "prop-types";

/* --- MATERIAL-UI IMPORTS --- */
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";

/* ----- COMPONENT IMPORTS ----- */
import ColorSelector from "./ColorSelector";

/*---Opens on selection of text from Book.---*/

const styles = theme => ({
  root: {
    position: "fixed",
    borderRadius: "10px"
    // backgroundColor: "red"
  },
  triangle: {
    // width: 0,
    // height: 0,
    // borderLeft: "10px solid transparent",
    // borderRight: "10px solid transparent",
    // borderBottom: "20px solid blue"
  },
  options: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const getTooltipPosition = selection => {
  // console.log(selection);
  const idToCheck = selection.endId ? selection.endId : selection.startId;
  const rect = document.getElementById(idToCheck).getBoundingClientRect();
  const top = rect.y;
  const right = rect.x < 350 ? 350 : rect.x;
  return { top: top + 20, right: -right };
};

class HighlightTooltip extends Component {
  addHighlight = color => {
    // console.table(selection);
    this.props.highlightsControl.add({
      ...this.props.selection,
      color: color
    });

    this.props.closeTooltip();
  };

  render() {
    const { selection, classes } = this.props;

    return (
      <Card
        raised
        className={classes.root}
        style={getTooltipPosition(selection)}
      >
        <ColorSelector
          handleClick={this.addHighlight}
          current="none"
          closeTooltip={this.props.closeTooltip}
        />
      </Card>
    );
  }
}

HighlightTooltip.propTypes = {
  highlightsControl: PropTypes.object
  // selection={this.state.selection}
  // closeTooltip={this.closeTooltip}
};

export default withStyles(styles)(HighlightTooltip);
