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
import Cached from "material-ui-icons/Cached";
import SkipNext from "material-ui-icons/SkipNext";
import SkipPrevious from "material-ui-icons/SkipPrevious";

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
  },
  button: {
    minWidth: 70
  }
});

class SpeedReaderControls extends Component {
  render() {
    const {
      classes,
      wpmOptions,
      changeWpm,
      wpm,
      resetWords,
      pause,
      play,
      skipPrevious,
      skipNext
    } = this.props;
    return (
      <div className={classes.controls}>
        <Button className={classes.button} onClick={resetWords}>
          <Cached />
        </Button>
        <Button className={classes.button} onClick={skipPrevious}>
          <SkipPrevious />
        </Button>
        {this.props.playing ? (
          <Button className={classes.button} onClick={pause}>
            <Pause />
          </Button>
        ) : (
          <Button className={classes.button} onClick={play}>
            <PlayArrow />
          </Button>
        )}
        <Button className={classes.button} onClick={skipNext}>
          <SkipNext />
        </Button>
        <FormControl className={classes.formControl}>
          <Select
            value={wpm}
            onChange={changeWpm}
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
  changeWpm: PropTypes.func,
  classes: PropTypes.object,
  pause: PropTypes.func,
  play: PropTypes.func,
  playing: PropTypes.bool,
  resetWords: PropTypes.func,
  skipNext: PropTypes.func,
  skipPrevious: PropTypes.func,
  wpm: PropTypes.number,
  wpmOptions: PropTypes.array
};

export default withStyles(styles)(SpeedReaderControls);
