import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import BookDisplay from "../components/BookDisplay";
import ImageGallery from "../components/ImageGallery";
import HighlightTooltip from "../components/HighlightTooltip";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Snackbar from "material-ui/Snackbar";
import Fade from "material-ui/transitions/Fade";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

/* ----- UTILITY IMPORTS ----- */
import { addHighlightsToBook } from "../utils/addHighlightsToBook";
import { buildArrayOfDisplayIds } from "../utils/buildArrayOfDisplayIds";

//import GET_DISPLAY from "../graphql/GET_DISPLAY";
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Book displays contents and processes highlights to be passed to Book component---*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginBottom: 100,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    Overflow: "hidden"
  },
  snackbar: {
    margin: theme.spacing.unit
  }
});
class Book extends Component {
  state = {
    showTooltip: false,
    selection: {
      startId: "emc-start",
      endId: "emc-end",
      content: "---"
    },
    gallery: { open: false, position: 0, images: [] },
    glossaryDefinition: "",
    open: false
  };

  /*---On select, open Tooltip, highlight content - save search details to state.---*/
  handleSelect = e => {
    const select = window.getSelection();

    if (select.toString().trim().length > 0) {
      /* --- check if <p> tag is selected anchorNode (start of selection) --- */
      const anchor = select.anchorNode.id
        ? /* --- assign id from the last element of previous <p> tag ---*/
          select.anchorNode.previousSibling.childNodes[
            select.anchorNode.previousSibling.childNodes.length - 1
          ].id
        : /* --- assign id from parentNode that was selected (typical) ---*/
          select.anchorNode.parentNode.id;

      /* --- check if <p> tag is selected in focusNode (end of selection) --- */
      const focus = select.focusNode.id
        ? /* --- assign id from the last element of previous <p> tag ---*/
          select.focusNode.previousSibling.childNodes[
            select.focusNode.previousSibling.childNodes.length - 1
          ].id
        : /* --- assign id from parentNode that was selected (typical) ---*/
          select.focusNode.parentNode.id;

      /* --- swap values if user highlighted content in reverse --- */
      const startId =
        parseInt(anchor.slice(4)) < parseInt(focus.slice(4)) ? anchor : focus;
      const endId =
        parseInt(anchor.slice(4)) > parseInt(focus.slice(4)) ? anchor : focus;

      /* --- build array of displayIds to fill this.state.content --- */
      const arrayOfContent = buildArrayOfDisplayIds(startId, endId);

      /* --- check for selection text after removing spaces --- */
      this.setState({
        showTooltip: true,
        selection: {
          startId: startId,
          endId: endId,
          content: arrayOfContent
            .map(
              displayId =>
                this.props.bookDisplayWithHighlights[displayId].content
            )
            .join("")
        }
      });
    } else {
      this.handleClear();

      if (
        select.anchorNode &&
        select.anchorNode.parentNode &&
        select.anchorNode.parentNode.className === "highlight"
      ) {
        const displayId = select.anchorNode.parentNode.id;
        const highlightIdArray = this.props.bookDisplayWithHighlights[displayId]
          .highlights;
        this.props.annotationModalControl.open(highlightIdArray);
      }
    }
  };

  handleSelectClick = (e, state) => {
    this.handleSelect(e);
    const glossaryWords = this.props.glossary;

    if (glossaryWords[e.target.innerHTML]) {
      console.log(glossaryWords[e.target.innerHTML].definition);

      this.setState({
        open: true,
        glossaryDefinition: glossaryWords[e.target.innerHTML].definition
      });
    } else {
      console.log(e.target.innerHTML, " is not a glossary word");
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelectTouch = e => {
    this.handleSelect(e);
  };
  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClear = e => {
    this.setState({
      showTooltip: false,
      selection: {
        startId: "---",
        endId: "---",
        content: "---"
      }
    });
  };

  closeTooltip = () => {
    this.setState({ showTooltip: false });
    window.getSelection().removeAllRanges();
  };

  /*---Update highlights array using ADD_HIGHLIGHT api.---*/
  saveAnnotation = () => {};
  /*---Update highlights array using UPDATE_HIGHLIGHT api.---*/
  updateHighlight = () => {};
  /*---Open ImageGallery with image information.---*/
  openGallery = () => {};
  /*---Add one to gallery position.---*/
  handleNext = () => {};
  /*---Subtract one from gallery position---*/
  handleBack = () => {};

  render() {
    /* --- run handleSelect on an interval if showTooltip is true --- */
    const selectWatcher = setTimeout(this.handleSelect, 500);
    const selectWatcherControl = this.state.showTooltip
      ? selectWatcher
      : clearInterval(selectWatcher);

    const { bookDisplay, galleries } = this.props.book;
    const { highlights, highlightsControl, settings, classes } = this.props;

    const highlightsKeys = Object.keys(highlights);
    // console.log(highlightsKeys);
    // console.log(highlights);

    highlightsKeys.forEach(highlightId => {
      const { startId, endId, id } = highlights[highlightId];

      // console.log("startID: ", startId.slice(4));
      // const emcIdArray =
      // TODO: only add highlightId to
    });
    const { vertical, horizontal, open } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs sm={2} />
          <Grid item xs sm={8}>
            {/* <div>{this.state.selection.content}</div> */}
            {this.state.event}
            {this.state.showTooltip ? (
              <HighlightTooltip
                open={this.state.showTooltip}
                selection={this.state.selection}
                highlightsControl={highlightsControl}
                closeTooltip={this.closeTooltip}
              />
            ) : null}

            <Snackbar
              className={classes.snackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={open}
              transition={Fade}
              onClose={this.handleClose}
              style={{
                bottom: 55,
                marginLeft: "101vw",
                width: "98%"
              }}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
              message={
                <span id="message-id">
                  Definition: {this.state.glossaryDefinition}
                </span>
              }
            />

            <BookDisplay
              handleSelectClick={this.handleSelectClick}
              handleSelectTouch={this.handleSelectTouch}
              bookDisplayWithHighlights={this.props.bookDisplayWithHighlights}
              highlights={highlights}
              settings={settings}
            />
            <ImageGallery
              galleries={galleries}
              bookName={settings.bookName}
              focusMode={settings.focusMode}
            />
          </Grid>
          <Grid item xs sm={2} />
        </Grid>
      </div>
    );
  }
}

Book.propTypes = {};

export default withStyles(styles)(Book);
