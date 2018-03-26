import React from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
/* ----- GRAPHQL IMPORTS ----- */
//import OPEN_ANNOTAION_MODAL from "../graphql/OPEN_ANNOTAION_MODAL";

/*---Displays a single highlights---*/

const Highlight = ({ highlight }) => {
  /*---Handles click on highlight - triggers OPEN_ANNOTAION_MODAL with highlightId.---*/
  const openAnnotaionModal = () => {};

  return <div>{this.props}</div>;
};

Highlight.propTypes = {
  highlight: PropTypes.object
};

export default Highlight;
