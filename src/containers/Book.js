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
      }

	/*---On select, open Tooltip, highlight content - save search details to state.---*/
	handleSelect = () => {}
	/*---Update highlights array using ADD_HIGHLIGHT api.---*/
	saveAnnotation = () => {}
	/*---Update highlights array using UPDATE_HIGHLIGHT api.---*/
	updateHighlight = () => {}
	/*---Open ImageGallery with image information.---*/
	openGallery = () => {}
	/*---Add one to gallery position.---*/
	handleNext = () => {}
	/*---Subtract one from gallery position---*/
	handleBack = () => {}
	
	render() { 
		const {} = this.props
		return (
			<div>Book
			<BookDisplay display="array" highlights="array" addHighlight="func" updateHighlight="func" deleteHighlight="func" /> 
			<ImageGallery gallery="object" /> 
			<HighlightTooltip open="string" /> 
			<GlossaryTooltip selection="object" />
			</div>
		)
	}
}

Book.propTypes = {
}

export default Book;