import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import HighlightsList from "../components/HighlightsList";
import StudyMode from "../components/StudyMode";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHTS from "../graphql/GET_HIGHLIGHTS";

/*---Hold selection filters in state while rendering the list.---*/

class Highlights extends Component {
  state = { filters: {}, filteredHighlights: [], studyMode: false };

  /*---On click, send filter name to toggle.---*/
  toggleFilter = () => {};
  /*---On click, toggle all filters.---*/
  toggleAllFilters = () => {};
  /*---Set studyModeOpen to 'true' -- which opens StudyMode container.---*/
  openStudyMode = () => {};

  render() {
    const {} = this.props;
    return (
      <div>
        Highlights
        <HighlightsList filteredList={this.props.Highlights} />
        <StudyMode filteredList="array" open="boolean" />
      </div>
    );
  }
}

Highlights.propTypes = {};

export default Highlights;
