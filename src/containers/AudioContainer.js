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
import CloseIcon from "material-ui-icons/Close";

import { withStyles } from "material-ui/styles";

/* ----- COMPONENT IMPORTS ----- */
import SettingsSelector from "../components/SettingsSelector";

/* ----- EXTERNAL LIBRARY IMPORTS ----- */
import ReactPlayer from "react-player";
import ReactSimpleRange from "react-simple-range";

const speeds = [0.75, 1.0, 1.25, 1.75, 2.0];

/*---undefined---*/
const styles = {
  root: { backgroundColor: "red", height: "200px" },
  controlIcons: {
    width: 330,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: "10px"
  },
  slider: {
    width: "100%"
  }
};
class AudioContainer extends Component {
  state = {
    idsToHighlight: [],
    textOnScreen: "",
    speed: 1,
    played: 0,
    duration: 0,
    seeking: false
  };

  /* --- TOTAL - triggered by ReactPlayer --- */
  handleSetDuration = duration => {
    if (!this.state.seeking) {
      this.setState({ duration: duration });
    }
  };

  /* --- SPEED - triggered by select in audio menu --- */
  handleSpeedChange = speed => {
    this.setState({ speed: speed });
  };

  handleSeek = slide => {
    console.log("slippery slide", slide);
    if (typeof slide !== "number") {
      this.setState({ played: slide.percent * 100, seeking: true });
    }
  };

  /* --- SEEK - triggered by ReactSimpleRange --- */
  onSeekMouseUp = slide => {
    console.log(slide);
    this.setState({ played: slide.percent * 100, seeking: false });
    this.player.seekTo(parseFloat(slide.percent));
  };

  audioListener = playObject => {
    const playedSeconds = playObject.playedSeconds;
    const played = playObject.played;
    console.log("played", played);
    const transcriptions = this.props.transcription;
    let currentTrans = transcriptions.find(el => {
      return (
        playedSeconds + 1.5 > el.startTime && playedSeconds + 1.5 < el.endTime
      );
    });

    if (!this.state.seeking) {
      this.setState({
        played: played * 100,
        playedSeconds: playedSeconds
      });
    }

    if (currentTrans !== undefined) {
      const text = currentTrans.phraseDisplayed;
      const ids = buildArrayOfDisplayIds(
        currentTrans.startId,
        currentTrans.endId
      );
      this.props.audioControls.setHighlights(ids);
      this.setState({
        textOnScreen: text,
        idsToHighlight: ids
      });
    }
  };
  ref = player => {
    this.player = player;
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
          style={{
            marginLeft: "100vw",
            marginBottom: "55px"
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={
            <div>
              <div className={classes.controlIcons}>
                <IconButton>
                  <Backward />
                </IconButton>
                <IconButton>
                  <Forward />
                </IconButton>
                {audio.isPlaying ? (
                  <IconButton>
                    <Pause onClick={audioControls.pause} />
                  </IconButton>
                ) : (
                  <IconButton>
                    <Play onClick={audioControls.play} />
                  </IconButton>
                )}
                <SettingsSelector
                  options={speeds}
                  handleChangeSettings={this.handleSpeedChange}
                  currentSelection={this.state.speed}
                />
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>

              <ReactSimpleRange
                thumbSize={18}
                min={0}
                max={100}
                step={1}
                value={this.state.played}
                onChange={this.handleSeek}
                onChangeComplete={this.onSeekMouseUp}
                className={classes.simpleRange}
                sliderColor="#fff"
                trackColor="#757575"
                thumbColor="#BDBDBD"
                sliderSize={2}
                eventWrapperPadding={1}
              />
            </div>
          }
        />
        <ReactPlayer
          ref={this.ref}
          url={audioFile}
          progressInterval={1000}
          playbackRate={this.state.speed}
          onProgress={this.audioListener}
          onDuration={this.handleSetDuration}
          playing={audio.isPlaying}
          onSeek={this.handleSeek}
          height={50}
          width={250}
        />
      </div>
    );
  }
}

AudioContainer.propTypes = {};

export default withStyles(styles)(AudioContainer);
