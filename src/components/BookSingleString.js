import React from "react";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";

/* ----- COMPONENT IMPORTS ----- */

/*---Handle element based on 'content', 'type', and 'classes'---*/

const BookSingleString = ({ content }) => {
  return (
    <div>
      BookSingleString
      {renderHTML(content)}
    </div>
  );
};

BookSingleString.propTypes = {
  element: PropTypes.string
};

export default BookSingleString;
