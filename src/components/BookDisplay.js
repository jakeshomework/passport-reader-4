import React from "react";
import PropTypes from "prop-types";
import orange from "material-ui/colors/orange";
/* ----- IMPORT UTILITIES ----- */
/* ----- COMPONENT IMPORTS ----- */
import BookSingleString from "./BookSingleString";
/* ----- DATA IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";

/*---Renders book content.---*/

const BookDisplay = ({
  bookDisplayWithHighlights,
  handleSelectClick,
  handleSelectTouch,
  highlights,
  addHighlight,
  updateHighlight,
  deleteHighlight
}) => {
  /*---Render book 'display' word by word into BookSingleWord, adding styles from highlights---*/
  const renderBookWithStyles = () => {};

  const displayKeys = Object.keys(bookDisplayWithHighlights);

  // console.log(bookDisplayWithHighlights["emc-62"]);

  // replace with props.settings.classView
  const classView = false;

  const generateHighlightColor = highlightsArray => {
    // console.log(highlights[highlightsArray[0]].color);
    return !classView
      ? colorLabels[highlights[highlightsArray[0]].color].active
      : highlightsArray.length > 9
        ? orange[900]
        : orange[highlightsArray.length * 100];
  };

  const displayString = displayKeys
    .map(key => {
      let el = bookDisplayWithHighlights[key];
      return el.highlights && el.highlights.length > 0
        ? // --- handle text tags and apply styles based on classView and highlights --- //
          `${el.display.slice(
            0,
            5
          )} class="highlight" style="background: ${generateHighlightColor(
            el.highlights
          )}" ${el.display.slice(5)}`
        : // if no highlights or if it's a tag, gallery, or aside render .display, as is
          el.display;
    })
    /* --- combine array into one giant string for rendering --- */
    .join("");
  return (
    <div>
      BookDisplay
      <BookSingleString
        handleSelectClick={handleSelectClick}
        handleSelectTouch={handleSelectTouch}
        content={displayString}
      />
    </div>
  );
};

BookDisplay.propTypes = {
  bookDisplay: PropTypes.object,
  handleSelect: PropTypes.func,
  highlights: PropTypes.object,
  addHighlight: PropTypes.func,
  updateHighlight: PropTypes.func,
  deleteHighlight: PropTypes.func
};

export default BookDisplay;
