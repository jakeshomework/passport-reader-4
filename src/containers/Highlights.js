import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- COMPONENT IMPORTS ----- */
import HighlightsList from "../components/HighlightsList";
// import FlashCardContainer from "./FlashCardContainer";

/* ----- MATERIAL-UI COMPONENTS ----- */
import { withStyles } from "material-ui/styles";
// import { filterHighlightsUtils } from "../utils/filterHighlightsUtils";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Hold selection filters in state while rendering the list.---*/
const styles = theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
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
        <Grid container spacing={24}>
          <Grid item xs sm={1} />
          <Grid item xs sm={10}>
            <Button variant="raised" className={classes.button}>
              Study Mode
              {/*<FlashCardContainer studySet={this.props.highlights} />*/}
            </Button>
            <HighlightsList
              filteredList={this.props.highlights}
              toggleFilter={this.toggleFilter}
              annotationModalControl={this.props.annotationModalControl}
              users={this.props.users}
            />
          </Grid>
          <Grid item xs sm={1} />
        </Grid>
      </div>
    );
  }
}

Highlights.propTypes = {
  highlights: PropTypes.object
  // style={Object.assign({}, styles.slide, styles.highlightsSlide)}
  // annotationModalControl={this.annotationModalControl}
  // users={UsersDemo}
};

export default withStyles(styles)(Highlights);
