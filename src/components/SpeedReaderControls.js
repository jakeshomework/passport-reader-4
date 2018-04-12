import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import Input from "material-ui/Input";
import { FormControl } from "material-ui/Form";

/* ----- ICON IMPORTS ----- */
import PlayArrow from "material-ui-icons/PlayArrow";
import Pause from "material-ui-icons/Pause";
import FastRewind from "material-ui-icons/FastRewind";
import FastForward from "material-ui-icons/FastForward";

/*---Control the display of the words in speed reader mode.---*/
const styles = theme => ({
  controls: {
    textAlign: "center",
    padding: 20
  },
  input: {
    paddingTop: "20px"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  }
});

class SpeedReaderControls extends Component {
  render() {
    const {
      classes,
      wpmOptions,
      changeWpm,
      fastForward,
      fastRewind,
      pause,
      play
    } = this.props;
    return (
      <div className={classes.controls}>
        <Button onClick={fastRewind}>
          <FastRewind />
        </Button>
        {this.props.playing ? (
          <Button onClick={pause}>
            <Pause />
          </Button>
        ) : (
          <Button onClick={play}>
            <PlayArrow />
          </Button>
        )}
        <Button onClick={fastForward}>
          <FastForward />
        </Button>
        <FormControl className={classes.formControl}>
          <Select
            value={this.props.wpm}
            placeholder={this.props.wpm}
            onChange={this.props.changeWpm}
            input={<Input id="select-wpm" />}
          >
            {wpmOptions.map(wpmOption => (
              <MenuItem key={wpmOption} value={wpmOption}>
                {wpmOption} wpm
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

SpeedReaderControls.propTypes = {
  display: PropTypes.array
};

export default withStyles(styles)(SpeedReaderControls);
