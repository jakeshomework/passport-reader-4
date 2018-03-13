import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */

/*---Handle element based on 'content', 'type', and 'classes'---*/

const SingleElement = ({element}) => {
	
	return(
		<div>SingleElement
		</div>
	)
}

SingleElement.propTypes = {
	element: PropTypes.object
}

export default SingleElement;