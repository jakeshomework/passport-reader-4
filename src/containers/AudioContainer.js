import React, { Component } from "react";
// import PropTypes from "prop-types";

/* ----- UTILITY IMPORTS ----- */
import { buildArrayOfDisplayIds } from "../utils/buildArrayOfDisplayIds";

/* ----- MATERIAL-UI IMPORTS ----- */
import Snackbar from "material-ui/Snackbar";
import Play from "material-ui-icons/PlayArrow";
import Pause from "material-ui-icons/Pause";
import Forward from "material-ui-icons/SkipNext";
import Backward from "material-ui-icons/SkipPrevious";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

import { withStyles } from "material-ui/styles";

/* ----- COMPONENT IMPORTS ----- */
import SettingsSelector from "../components/SettingsSelector";
import AudioSwitch from "../components/AudioSwitch";

/* ----- EXTERNAL LIBRARY IMPORTS ----- */
import ReactPlayer from "react-player";
import ReactSimpleRange from "react-simple-range";

// const speedObjects = [
//   { number: 0.75, display: "0.75x" },
//   { number: 1.0, display: "1.0x" },
//   { number: 1.25, display: "1.25x" },
//   { number: 1.5, display: "1.5x" },
//   { number: 0.75, display: "0.75" },
//   { number: 1.75, display: "1.75x" },
//   { number: 2.0, display: "2.0x" }
// ];

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
  },
  pausePlayButton: {
    flexGrow: 1
  },
  forwardBackwardButtons: {
    marginRight: 10
  }
};
class AudioContainer extends Component {
  state = {
    idsToHighlight: [],
    textOnScreen: "",
    speed: 1,
    played: 0,
    playedSeconds: 0,
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

  findCurrentTranscriptionIndex = playedSeconds => {
    return this.props.transcription.findIndex(el => {
      return playedSeconds <= el.endTime && playedSeconds >= el.startTime;
    });
  };

  handleSeekToNext = () => {
    let currentIndex = this.findCurrentTranscriptionIndex(
      this.state.playedSeconds
    );

    if (currentIndex !== this.props.transcription.length - 1) {
      const nextTranscription = this.props.transcription[currentIndex + 1];
      const { startTime } = nextTranscription;

      /* --- update player --- */
      this.player.seekTo(parseFloat(startTime));

      /* --- update highlights and playedSeconds --- */
      const ids = buildArrayOfDisplayIds(
        nextTranscription.startId,
        nextTranscription.endId
      );
      this.props.audioControls.setHighlights(ids);
      this.setState({
        idsToHighlight: ids,
        playedSeconds: nextTranscription.startTime
      });
    }

    console.log("currentIndex", currentIndex);
  };

  handleSeekToPrevius = () => {
    let currentIndex = this.findCurrentTranscriptionIndex(
      this.state.playedSeconds
    );
    if (currentIndex !== 0) {
      let oneOrZero =
        this.state.playedSeconds - 2 <
        this.props.transcription[currentIndex].startTime
          ? 1
          : 0;
      const prevTranscription = this.props.transcription[
        currentIndex - oneOrZero
      ];
      const { startTime } = prevTranscription;

      /* --- update player --- */
      this.player.seekTo(parseFloat(startTime));

      /* --- update highlights and playedSeconds --- */
      const ids = buildArrayOfDisplayIds(
        prevTranscription.startId,
        prevTranscription.endId
      );
      this.props.audioControls.setHighlights(ids);
      this.setState({
        idsToHighlight: ids,
        playedSeconds: prevTranscription.startTime
      });
    }
  };

  /* --- SEEK - triggered by ReactSimpleRange --- */
  handleSeek = slide => {
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
    // console.log("played", played);
    // console.log("playedSeconds", playedSeconds);
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
    const { bookName, audio, audioControls, classes } = this.props;

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
                <AudioSwitch
                  label="Highlight"
                  setting={audio.showAudioHighlights}
                  handleChangeSettings={audioControls.toggleShowAudioHighlights}
                />
                {audio.isPlaying ? (
                  <IconButton
                    className={classes.pausePlayButton}
                    onClick={audioControls.pause}
                    variant="raised"
                  >
                    <Pause />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.pausePlayButton}
                    onClick={audioControls.play}
                    variant="raised"
                  >
                    <Play />
                  </IconButton>
                )}
                <div className={classes.forwardBackwardButtons}>
                  <IconButton onClick={this.handleSeekToPrevius}>
                    <Backward />
                  </IconButton>
                  <IconButton onClick={this.handleSeekToNext}>
                    <Forward />
                  </IconButton>
                </div>
                <SettingsSelector
                  options={speeds}
                  handleChangeSettings={this.handleSpeedChange}
                  currentSelection={this.state.speed}
                />
                <IconButton onClick={audioControls.closeAudioMenu}>
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

AudioContainer.propTypes = {
  // transcription: PropTypes.Object,
  // audioControls: PropTypes.Object,
  // audio: PropTypes.Object
};

export default withStyles(styles)(AudioContainer);
