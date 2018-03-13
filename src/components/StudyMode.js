import React, { Component } from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */

/*---Opens on click from Highlights container---*/

class StudyMode extends Component {

	state = { position: 0 }

	/*---onClick - Increase position by one---*/
	handleNext = () => {}
	/*---onClick - Decrease position by one---*/
	handleBack = () => {}
	
	render() { 
		const {filteredList,open} = this.props
		return (
			<div>StudyMode
			</div>
		)
	}
}

StudyMode.propTypes = {
	filteredList: PropTypes.array,
	open: PropTypes.boolean
}

export default StudyMode;