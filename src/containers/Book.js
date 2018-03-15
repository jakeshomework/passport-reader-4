import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import BookDisplay from "../components/BookDisplay";
import ImageGallery from "../components/ImageGallery";
import HighlightTooltip from "../components/HighlightTooltip";
import GlossaryTooltip from "../components/GlossaryTooltip";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_DISPLAY from "../graphql/GET_DISPLAY";
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Book displays contents and processes highlights to be passed to Book component---*/

class Book extends Component {
  state = {
    selection: {},
    gallery: { open: false, position: 0, images: [] }
  };

  /*---On select, open Tooltip, highlight content - save search details to state.---*/
  handleSelect = () => {};
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
    const { bookDisplay } = this.props.book;
    const { highlights } = this.props;

    let bookDisplayWithHighlights = bookDisplay;

    const highlightsKeys = Object.keys(highlights);
    console.log(highlightsKeys);
    console.log(highlights);
    highlightsKeys.forEach(highlightId => {
      const { startId, endId, id } = highlights[highlightId];

      console.log(startId.slice(4));
      // const emcIdArray =
      // TODO: only add highlightId to
    });

    return (
      <div>
        Book
        <BookDisplay
          onClick={this.handleSelect}
          bookDisplay={bookDisplayWithHighlights}
          highlights={highlights}
          addHighlight="func"
          updateHighlight="func"
          deleteHighlight="func"
        />
        <ImageGallery gallery="object" />
        <HighlightTooltip open="string" />
        <GlossaryTooltip selection="object" />
      </div>
    );
  }
}

Book.propTypes = {};

export default Book;
