import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";
import Button from "material-ui/Button";

/* ----- COMPONENT IMPORTS ----- */

/*---Opens on selection of text from Book.---*/

// const renderTooltip = position => {
//   ReactDOM.render(<Tooltip open={true} />, document.getElementById(position));
// };

const styles = theme => ({
  root: {
    position: "fixed",
    backgroundColor: "red"
  }
});

const getTooltipPosition = selection => {
  // console.log(selection);
  const idToCheck = selection.endId ? selection.endId : selection.startId;
  const rect = document.getElementById(idToCheck).getBoundingClientRect();
  const top = rect.y;
  const right = rect.x < 250 ? 250 : rect.x;
  return { top: top + 20, right: -right };
};

const HighlightTooltip = ({ open, selection, classes, highlightsControl }) => {
  //   componentDidMount() {
  //     renderTooltip(this.props.position);
  //   }

  //   componentDidUpdate() {
  //     renderTooltip(this.props.position);
  //   }

  const handleAdd = () => {
    // console.table(selection);
    highlightsControl.add(selection);
  };

  return (
    <Card raised className={classes.root} style={getTooltipPosition(selection)}>
      <h2>No, I'm the tooltip</h2>
      <Button onClick={handleAdd}>Add a fucking highlight!</Button>
    </Card>
  );
};

HighlightTooltip.propTypes = {
  open: PropTypes.string,
  selection: PropTypes.object
};

export default withStyles(styles)(HighlightTooltip);
