import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card from "material-ui/Card";

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
  console.log(selection);
  const idToCheck = selection.endId ? selection.endId : selection.startId;
  const rect = document.getElementById(idToCheck).getBoundingClientRect();
  console.log(rect.x, rect.y);
  const top = rect.y;
  const right = rect.x < 250 ? 250 : rect.x;
  return { top: top + 20, right: -right };
};

const HighlightTooltip = ({ open, selection, classes }) => {
  //   componentDidMount() {
  //     renderTooltip(this.props.position);
  //   }

  //   componentDidUpdate() {
  //     renderTooltip(this.props.position);
  //   }

  return (
    <Card raised className={classes.root} style={getTooltipPosition(selection)}>
      <h2>No, I'm the tooltip</h2>
    </Card>
  );
};

HighlightTooltip.propTypes = {
  open: PropTypes.string,
  selection: PropTypes.object
};

export default withStyles(styles)(HighlightTooltip);
