import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Button from "material-ui/Button";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import TextField from "material-ui/TextField";

/* ----- ICON IMPORTS ----- */
import PlayArrow from "material-ui-icons/PlayArrow";
import Pause from "material-ui-icons/Pause";
import Replay30 from "material-ui-icons/Replay30";
import ArrowUpward from "material-ui-icons/ArrowUpward";
import ArrowDownward from "material-ui-icons/ArrowDownward";

/*---Control the display of the words in speed reader mode.---*/
const styles = theme => ({
  controls: {
    textAlign: "center",
    padding: 20
  },
  input: {
    paddingTop: "20px"
  }
});

class SpeedReaderControls extends Component {
  render() {
    const { display, classes } = this.props;
    return (
      <div className={classes.controls}>
        <Input
          id="wpm"
          value={this.props.wpm}
          onChange={this.props.handleChange}
          startAdornment={
            <InputAdornment position="start">WPM: </InputAdornment>
          }
          placeholder={this.props.wpm}
        />
        <Button onClick={this.props.increaseSpeed}>
          <ArrowUpward />
        </Button>
        <Button onClick={this.props.decreaseSpeed}>
          <ArrowDownward />
        </Button>
        <Button
          //onClick={this.props.togglePlay}
          onClick={this.props.displayOneWord}
        >
          {this.props.playing ? (
            <Pause className={classes.icon} />
          ) : (
            <PlayArrow className={classes.icon} />
          )}
        </Button>
      </div>
    );
  }
}

SpeedReaderControls.propTypes = {
  display: PropTypes.array
};

export default withStyles(styles)(SpeedReaderControls);
