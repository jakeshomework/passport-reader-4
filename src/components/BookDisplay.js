import React from "react";
import PropTypes from "prop-types";
import orange from "material-ui/colors/orange";

/* ----- COMPONENT IMPORTS ----- */
import BookSingleString from "./BookSingleString";

/*---Renders book content.---*/

const BookDisplay = ({
  bookDisplay,
  highlights,
  addHighlight,
  updateHighlight,
  deleteHighlight
}) => {
  /*---Render book 'display' word by word into BookSingleWord, adding styles from highlights---*/
  const renderBookWithStyles = () => {};

  const displayKeys = Object.keys(bookDisplay);

  // replace with props.settings.classView
  const classView = false;

  const generateHighlightColor = highlightsArray => {
    // TODO sort by highlight.updated
    return highlightsArray[0].color;
  };

  const generateHighlightShade = highlightsArray => {
    return highlightsArray.length > 9
      ? orange[900]
      : orange[highlightsArray.length * 100];
  };

  const displayString = displayKeys
    .map(key => {
      bookDisplay[key].type == "text" && bookDisplay[key].highlights.length > 0
        ? // --- handle text tags and apply styles based on classView and highlights --- //
          classView
          ? // --- if class view is enabled in Settings, render shade of orange --- //
            `<span style='background: ${generateHighlightShade(
              bookDisplay.highlights
            )}'>${bookDisplay[key].display}<span>`
          : // --- if class view is not enabled in Settings, render highlight.color --- //
            `<span style='background: ${generateHighlightColor(
              bookDisplay.highlights
            )}'>${bookDisplay[key].display}<span>`
        : // if no highlights or if it's a tag, gallery, or aside render .display, as is
          bookDisplay[key].display;
    })
    .join("");

  return (
    <div>
      BookDisplay
      <BookSingleString content={displayString} />
    </div>
  );
};

BookDisplay.propTypes = {
  bookDisplay: PropTypes.object,
  highlights: PropTypes.array,
  addHighlight: PropTypes.func,
  updateHighlight: PropTypes.func,
  deleteHighlight: PropTypes.func
};

export default BookDisplay;
