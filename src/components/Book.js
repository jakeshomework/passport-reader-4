import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SingleElement from "./SingleElement";

/*---Renders book content.---*/

const Book = ({display,highlights,addHighlight,updateHighlight,deleteHighlight}) => {
	/*---Render book 'display' word by word into SingleElement, adding styles from highlights---*/
	const renderBookWithStyles = () => {}
	
	return(
		<div>Book
			<SingleElement element="object" />
		</div>
	)
}

Book.propTypes = {
	display: PropTypes.array,
	highlights: PropTypes.array,
	addHighlight: PropTypes.func,
	updateHighlight: PropTypes.func,
	deleteHighlight: PropTypes.func
}

export default Book;