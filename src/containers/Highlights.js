import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import HighlightsList from "../components/HighlightsList";
import StudyMode from "../components/StudyMode";
import { withStyles } from "material-ui/styles";
import { filterHighlightsUtils } from "../utils/filterHighlightsUtils";
import Button from "material-ui/Button";

/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Hold selection filters in state while rendering the list.---*/
const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center"
  },
  button: {
    margin: theme.spacing.unit * 4,
    float: "right"
  },
  input: {
    display: "none"
  }
});

class Highlights extends Component {
  state = { filters: {}, filteredHighlights: [], studyMode: false };

  /*---On click, send filter name to toggle.---*/
  toggleFilter = () => {};
  /*---On click, toggle all filters.---*/
  toggleAllFilters = () => {};
  /*---Set studyModeOpen to 'true' -- which opens StudyMode container.---*/
  openStudyMode = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="raised" className={classes.button}>
          <StudyMode filteredList="array" open="boolean" />
        </Button>
        <HighlightsList
          filteredList={this.props.highlights}
          toggleFilter={this.toggleFilter}
          annotationModalControl={this.props.annotationModalControl}
        />
      </div>
    );
  }
}

Highlights.propTypes = {};

export default withStyles(styles)(Highlights);
