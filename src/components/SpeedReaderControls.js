import React, { Component } from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */

/*---Control the display of the words in speed reader mode.---*/

class SpeedReaderControls extends Component {

	state = {
        position: "0",
        speed: "250",
        interval: "25",
        isPlaying: false
      }

	/*---Toggle between pause and play on click.---*/
	togglePlay = () => {}
	/*---scrub, add, or subtract speed reader position in book.---*/
	changePosition = () => {}
	/*---Change speed of speed reader playback.---*/
	changeSpeed = () => {}
	
	render() { 
		const {display} = this.props
		return (
			<div>SpeedReaderControls
			</div>
		)
	}
}

SpeedReaderControls.propTypes = {
	display: PropTypes.array
}

export default SpeedReaderControls;