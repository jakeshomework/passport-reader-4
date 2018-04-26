import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- COMPONENT IMPORTS ----- */
import HighlightsList from "../components/HighlightsList";
import FlashCardContainer from "./FlashCardContainer";

/* ----- MATERIAL-UI COMPONENTS ----- */
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Hidden from "material-ui/Hidden";

/*---Hold selection filters in state while rendering the list.---*/
const styles = theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    float: "right"
  },
  buttonFull: {
    margin: theme.spacing.unit,
    width: "96%",
    float: "right"
  },
  input: {
    display: "none"
  }
});

class Highlights extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Hidden xsDown>
            <Grid item sm={1} />
          </Hidden>
          <Grid item xs={12} sm={10}>
            <Hidden smUp>
              <Button
                variant="raised"
                className={classes.buttonFull}
                color="primary"
              >
                <FlashCardContainer studyObject={this.props.highlights} />
              </Button>
            </Hidden>
            <Hidden only="xs">
              <Button
                variant="raised"
                className={classes.button}
                color="primary"
              >
                <FlashCardContainer studyObject={this.props.highlights} />
              </Button>
            </Hidden>

            <HighlightsList
              filteredList={this.props.highlights}
              toggleFilter={this.toggleFilter}
              annotationModalControl={this.props.annotationModalControl}
              users={this.props.users}
            />
          </Grid>
          <Hidden xsDown>
            <Grid item sm={1} />
          </Hidden>
        </Grid>
      </div>
    );
  }
}

Highlights.propTypes = {
  highlights: PropTypes.object,
  annotationModalControl: PropTypes.object,
  users: PropTypes.object,
  style: PropTypes.object,
  classes: PropTypes.object

  // style={Object.assign({}, styles.slide, styles.highlightsSlide)}
  // annotationModalControl={this.annotationModalControl}
  // users={UsersDemo}
};

export default withStyles(styles)(Highlights);
