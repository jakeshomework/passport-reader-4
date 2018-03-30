import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import Card from "material-ui/Card";
import Button from "material-ui/Button";
import Edit from "material-ui-icons/Edit";
import Mic from "material-ui-icons/Mic";
import Videocam from "material-ui-icons/Videocam";
import Share from "material-ui-icons/Share";
import CloseIcon from "material-ui-icons/Close";

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
  //   componentDidMount() {
  //     renderTooltip(this.props.position);
  //   }

  //   componentDidUpdate() {
  //     renderTooltip(this.props.position);
  //   }

  addHighlight = color => {
    // console.table(selection);
    this.props.highlightsControl.add({
      ...this.props.selection,
      color: color
    });

    this.props.closeTooltip();
  };

  render() {
    const { open, selection, classes } = this.props;

    return (
      <Card
        raised
        className={classes.root}
        style={getTooltipPosition(selection)}
      >
        {/*<div className={classes.triangle} />*/}
        <ColorSelector
          handleClick={this.addHighlight}
          current="none"
          closeTooltip={this.props.closeTooltip}
        />

        {/*<div className={classes.options}>
          <div>
            <IconButton className={classes.button} aria-label="Note">
              <Edit />
            </IconButton>
            <IconButton className={classes.button} aria-label="Microphone">
              <Mic />
            </IconButton>
            <IconButton className={classes.button} aria-label="Video">
              <Videocam />
            </IconButton>
          </div>
          <Button raised>Cancel</Button>
        </div>*/}
      </Card>
    );
  }
}

HighlightTooltip.propTypes = {
  open: PropTypes.string,
  selection: PropTypes.object
};

export default withStyles(styles)(HighlightTooltip);
