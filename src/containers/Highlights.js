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
    float: "right",
    // padding: "8px 16px",
    minWidth: "88px",
    fontSize: "1rem",
    boxSizing: "border-box",
    minHeight: "36px",
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    lineHeight: "1.4em",
    fontWight: "500",
    borderRadius: "2px",
    textTransform: "uppercase",
    backgroundColor: "#4695ec",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  },
  buttonFull: {
    margin: theme.spacing.unit,
    width: "96%",
    float: "right",
    minWidth: "88px",
    fontSize: "1rem",
    boxSizing: "border-box",
    minHeight: "36px",
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    lineHeight: "1.4em",
    fontWight: "500",
    borderRadius: "2px",
    textTransform: "uppercase",
    backgroundColor: "#4695ec",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  },
  input: {
    display: "none"
  }
});

class Highlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredHighlights: []
    }
  }
  filterHighlights = (filteredHighlights) => {

    console.log("filter: ", filteredHighlights)
  }



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
              <div
                className={classes.buttonFull}
              >
                <FlashCardContainer studyObject={this.props.highlights} />
              </div>
            </Hidden>
            <Hidden only="xs">

              <div
                className={classes.button}
              >
                <FlashCardContainer studyObject={this.props.highlights} />
              </div>
            </Hidden>

            <HighlightsList
              allHighlights={this.props.highlights}
              toggleFilter={this.toggleFilter}
              annotationModalControl={this.props.annotationModalControl}
              users={this.props.users}
              filteredHighlights={this.filterHighlights}
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
