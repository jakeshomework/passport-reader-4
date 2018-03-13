import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import AnnotationColorSelector from "../components/AnnotationColorSelector";
import AnnotationOptions from "../components/AnnotationOptions";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHT_BY_ID from "../graphql/GET_HIGHLIGHT_BY_ID";
//import UPDATE_HIGHLIGHT from "../graphql/UPDATE_HIGHLIGHT";
//import DELETE_HIGHLIGHT from "../graphql/DELETE_HIGHLIGHT";

/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const AnnotationModal = ({}) => {
	/*---Update highlights array using UPDATE_HIGHLIGHT api.---*/
	const updateAnnotation = () => {}
	/*---Delete highlight using DELETE_HIGHLIGHT api.---*/
	const deleteAnnotation = () => {}
	
	return(
		<div>AnnotationModal
			<AnnotationColorSelector updateHighlight="func" /> 
			<AnnotationOptions updateHighlight="func" />
		</div>
	)
}

AnnotationModal.propTypes = {
}

export default AnnotationModal;