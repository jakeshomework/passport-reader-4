import React from "react";
import PropTypes from "prop-types";

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

  const displayString =
    displayKeys.length > 0
      ? displayKeys
          .map(key => {
            return bookDisplay[key] ? bookDisplay[key].display : "";
          })
          .join("")
      : "";

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
