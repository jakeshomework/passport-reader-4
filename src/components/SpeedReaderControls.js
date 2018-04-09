import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- ICON IMPORTS ----- */
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import PlayArrow from "material-ui-icons/PlayArrow";
import Replay30 from "material-ui-icons/Replay30";

/*---Control the display of the words in speed reader mode.---*/

class SpeedReaderControls extends Component {
  state = {
    open: false
  };

  /*---Toggle between pause and play on click.---*/
  togglePlay = () => {};
  /*---scrub, add, or subtract speed reader position in book.---*/
  changePosition = () => {};
  /*---Change speed of speed reader playback.---*/
  changeSpeed = () => {};

  render() {
    const { display } = this.props;
    return (
      <div>
        <Replay30 onClick={this.props.Replay30} />
        <PlayArrow onClick={this.props.togglePlay} />
        {/* <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        </Select> */}
      </div>
    );
  }
}

SpeedReaderControls.propTypes = {
  display: PropTypes.array
};

export default SpeedReaderControls;
