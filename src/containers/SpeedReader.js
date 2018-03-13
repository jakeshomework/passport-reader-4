import React, { Component } from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SpeedReaderSingle from "../components/SpeedReaderSingle";
import SpeedReaderControls from "../components/SpeedReaderControls";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_BOOK from "../graphql/GET_BOOK";
//import GET_SETTINGS from "../graphql/GET_SETTINGS";

/*---undefined---*/

class SpeedReader extends Component {

	state = {position: 0, speed: 250}

	/*------*/
	adjustWPM = () => {}
	/*------*/
	pauseSpeed = () => {}
	/*------*/
	goBackRequest = () => {}
	
	render() { 
		const {} = this.props
		return (
			<div>SpeedReader
			<SpeedReaderSingle word="string" /> 
			<SpeedReaderControls display="array" />
			</div>
		)
	}
}

SpeedReader.propTypes = {
}

export default SpeedReader;