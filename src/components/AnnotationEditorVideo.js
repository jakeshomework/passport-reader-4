import React from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

/* --- IMPORT EXTERNAL LIBRARIES --- */
import MediaCapturer from "react-multimedia-capture";

const styles = {
  videoPlayer: {
    width: "100%"
  }
};
class AnnotationEditorVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      granted: false,
      rejectedReason: "",
      recording: false,
      paused: false,
      videoSrc: ""
    };

    this.handleGranted = this.handleGranted.bind(this);
    this.handleDenied = this.handleDenied.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.setStreamToVideo = this.setStreamToVideo.bind(this);
    this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);
  }
  handleGranted() {
    this.setState({ granted: true });
    console.log("Permission Granted!");
  }
  handleDenied(err) {
    this.setState({ rejectedReason: err.name });
    console.log("Permission Denied!", err);
  }
  handleStart(stream) {
    this.setState({
      recording: true
    });

    this.setStreamToVideo(stream);
    console.log("Recording Started.");
  }
  handleStop(blob) {
    this.setState({
      recording: false
    });

    this.releaseStreamFromVideo();

    console.log("Recording Stopped.");
    this.downloadVideo(blob);
  }
  handlePause() {
    this.releaseStreamFromVideo();

    this.setState({
      paused: true
    });
  }
  handleResume(stream) {
    this.setStreamToVideo(stream);

    this.setState({
      paused: false
    });
  }
  handleError(err) {
    console.log(err);
  }
  setStreamToVideo(stream) {
    let video = this.refs.app.querySelector("video");

    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    } else {
      video.src = stream;
    }
  }
  releaseStreamFromVideo() {
    this.refs.app.querySelector("video").src = "";
  }
  downloadVideo(blob) {
    let url = URL.createObjectURL(blob);
    this.setState({ videoSrc: url });
    // let a = document.createElement("a");
    // a.style.display = "none";
    // a.href = url;
    // a.target = "_blank";
    // document.body.appendChild(a);

    // a.click();
  }
  render() {
    const { classes } = this.props;
    const granted = this.state.granted;
    const rejectedReason = this.state.rejectedReason;
    const recording = this.state.recording;
    const paused = this.state.paused;

    return (
      <div ref="app">
        <h3>Video Recorder</h3>
        <MediaCapturer
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onPause={this.handlePause}
          onResume={this.handleResume}
          onError={this.handleError}
          render={({ start, stop, pause, resume }) => (
            <div>
              <p>Granted: {granted.toString()}</p>
              <p>Rejected Reason: {rejectedReason}</p>
              <p>Recording: {recording.toString()}</p>
              <p>Paused: {paused.toString()}</p>
              <button onClick={start}>Start</button>
              <button onClick={stop}>Stop</button>
              <button onClick={pause}>Pause</button>
              <button onClick={resume}>Resume</button>

              <p>Streaming test</p>

              <video
                autoPlay
                loop
                controls={this.state.videoSrc ? true : false}
                src={this.state.videoSrc}
                className={classes.videoPlayer}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AnnotationEditorVideo);
