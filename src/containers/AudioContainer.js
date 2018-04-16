import React, { Component } from "react";
import PropTypes from "prop-types";
import { buildArrayOfDisplayIds } from "../utils/buildArrayOfDisplayIds";
/* ----- MATERIAL-UI IMPORTS ----- */
import Typography from "material-ui/Typography";
import Snackbar, { SnackbarContent } from "material-ui/Snackbar";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Snackbar";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Play from "material-ui-icons/PlayArrow";
import Pause from "material-ui-icons/Pause";
import Forward from "material-ui-icons/Forward10";
import Backward from "material-ui-icons/Replay10";
import { LinearProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";

import { withStyles } from "material-ui/styles";

/* ----- COMPONENT IMPORTS ----- */

/* ----- EXTERNAL LIBRARY IMPORTS ----- */
import ReactAudioPlayer from "react-player";

/*---undefined---*/
const styles = {
  root: { backgroundColor: "red", height: "200px" },
  controlIcons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
};
class AudioContainer extends Component {
  state = {
    idsToHighlight: [],
    textOnScreen: "",
    speed: 1,
    seconds: 20
  };

  handleSpeedChange = e => {
    this.setState({ speed: e.target.value });
  };

  audioListener = playObject => {
    console.log(playObject);
    const time = playObject.playedSeconds;
    const transcriptions = this.props.transcription;
    let currentTrans = transcriptions.find(el => {
      return time + 1 > el.startTime && time + 1 < el.endTime;
    });

    console.log(currentTrans);

    if (currentTrans !== undefined) {
      const text = currentTrans.phraseDisplayed;
      const ids = buildArrayOfDisplayIds(
        currentTrans.startId,
        currentTrans.endId
      );
      this.props.audioControls.setHighlights(ids);
      this.setState({ textOnScreen: text, idsToHighlight: ids });
    }
  };

  render() {
    const {
      bookName,
      transcription,
      audio,
      audioControls,
      classes
    } = this.props;

    const audioFile = `book-${bookName}/audio/${bookName}.mp3`;

    return (
      <div>
        <Snackbar
          open={audio.isMenuOpen}
          style={{ marginLeft: "100vw", marginBottom: "50px" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={
            <div>
              <div className={classes.controlIcons}>
                <IconButton>
                  <Backward />
                </IconButton>
                {audio.isPlaying ? (
                  <IconButton onClick={audioControls.pause}>
                    <Pause />
                  </IconButton>
                ) : (
                  <IconButton onClick={audioControls.play}>
                    <Play />
                  </IconButton>
                )}
                <IconButton>
                  <Forward />
                </IconButton>
              </div>

              <LinearProgress
                variant="determinate"
                value={this.state.seconds}
                valueBuffer={100}
              />

              <Select
                value={this.state.speed}
                onChange={this.handleSpeedChange}
              >
                <MenuItem value={0.75}>.75</MenuItem>
                <MenuItem value={1}>1.0</MenuItem>
                <MenuItem value={1.25}>1.25</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={1.75}>1.75</MenuItem>
                <MenuItem value={2}>2.0</MenuItem>
              </Select>
            </div>
          }
        />
        <ReactAudioPlayer
          url={audioFile}
          progressInterval={1000}
          onProgress={this.audioListener}
          playing={audio.isPlaying}
          height={50}
          width={250}
        />
      </div>
    );
  }
}

AudioContainer.propTypes = {};

export default withStyles(styles)(AudioContainer);
