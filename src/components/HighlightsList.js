import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import Highlight from "./Highlight";

/*---Displays a list of Highlights---*/

const HighlightsList = ({filteredList}) => {
	
	return(
		<div>HighlightsList
			<Highlight highlight="object" />
		</div>
	)
}

HighlightsList.propTypes = {
	filteredList: PropTypes.array
}

export default HighlightsList;