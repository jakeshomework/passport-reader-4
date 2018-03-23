import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import BookDisplay from "../components/BookDisplay";
import ImageGallery from "../components/ImageGallery";
import HighlightTooltip from "../components/HighlightTooltip";
import GlossaryTooltip from "../components/GlossaryTooltip";
/* ----- UTILITY IMPORTS ----- */
import { addHighlightsToBook } from "../utils/addHighlightsToBook";
import { buildArrayOfDisplayIds } from "../utils/buildArrayOfDisplayIds";

//import GET_DISPLAY from "../graphql/GET_DISPLAY";
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Book displays contents and processes highlights to be passed to Book component---*/

class Book extends Component {
  state = {
    showTooltip: false,
    selection: {
      startId: "emc-start",
      endId: "emc-end",
      content: "---"
    },
    gallery: { open: false, position: 0, images: [] }
  };

  bookDisplayWithHighlights = () => {
    return addHighlightsToBook(
      this.props.book.bookDisplay,
      this.props.highlights
    );
  };

  /*---On select, open Tooltip, highlight content - save search details to state.---*/
  handleSelect = () => {
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

      console.log("a greater than f", anchor.slice(4) > focus.slice(4));

      console.log("anchor", anchor, "focus", focus);
      console.log("start", startId, "end", endId);

      /* --- build array of displayIds to fill this.state.content --- */
      const arrayOfContent = buildArrayOfDisplayIds(startId, endId);
      console.log(arrayOfContent);

      /* --- check for selection text after removing spaces --- */
      this.setState({
        showTooltip: true,
        selection: {
          startId: startId,
          endId: endId,
          content: arrayOfContent
            .map(displayId => this.props.book.bookDisplay[displayId].content)
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
        this.props.annotationModalControl.open();
      } else {
        // console.log("Nada for highlights");
      }
    }
  };

  handleSelectClick = () => {
    this.handleSelect();
  };

  handleSelectTouch = () => {
    this.handleSelect();
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

    const { bookDisplay } = this.props.book;
    const { highlights, highlightsControl } = this.props;

    const highlightsKeys = Object.keys(highlights);
    // console.log(highlightsKeys);
    // console.log(highlights);
    highlightsKeys.forEach(highlightId => {
      const { startId, endId, id } = highlights[highlightId];

      // console.log(startId.slice(4));
      // const emcIdArray =
      // TODO: only add highlightId to
    });

    return (
      <div>
        Book selected:
        <div>{` ${this.state.selection.startId} -> ${this.state.selection
          .endId}`}</div>
        <div>{this.state.selection.content}</div>
        {this.state.event}
        {this.state.showTooltip ? (
          <HighlightTooltip
            open={this.state.showTooltip}
            selection={this.state.selection}
            highlightsControl={highlightsControl}
          />
        ) : null}
        <BookDisplay
          handleSelectClick={this.handleSelectClick}
          handleSelectTouch={this.handleSelectTouch}
          bookDisplayWithHighlights={this.bookDisplayWithHighlights()}
          highlights={highlights}
          addHighlight="func"
          updateHighlight="func"
          deleteHighlight="func"
        />
        <ImageGallery gallery="object" />
        <GlossaryTooltip selection="object" />
      </div>
    );
  }
}

Book.propTypes = {};

export default Book;
