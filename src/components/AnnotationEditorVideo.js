import React from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import Card from "material-ui/Card";
import { withStyles } from "material-ui/styles";
/* --- IMPORT EXTERNAL LIBRARIES --- */
import MediaCapturer from "react-multimedia-capture";
/* ----- COMPONENT IMPORTS ----- */
import AnnotationSaveButtons from "./AnnotationSaveButtons";

const styles = {
  root: {
    width: "100%"
  },
  videoPlayer: {
    // minWidth: "320px",
    width: "100%"
  },
  videoContainer: {
    padding: 5
  },

  recorderButtonsContainer: {
    display: "flex",
    justifyContent: "space-around"
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
      videoSrc: "",
      savedAudioFile: ""
    };

    // this.handleGranted = this.handleGranted.bind(this);
    // this.handleDenied = this.handleDenied.bind(this);
    // this.handleStart = this.handleStart.bind(this);
    // this.handleStop = this.handleStop.bind(this);
    // this.handlePause = this.handlePause.bind(this);
    // this.handleResume = this.handleResume.bind(this);
    // this.setStreamToVideo = this.setStreamToVideo.bind(this);
    // this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
    // this.downloadVideo = this.downloadVideo.bind(this);
  }

  componentDidMount = () => {
    this.setState({ videoSrc: this.props.modifiedAnnotation.content });
  };

  handleSave = () => {
    /* --- save in Open Modal --- */
    this.props.modalActions.updateAnnotation({
      annotationIndex: this.props.annotationIndex,
      content: "demo-annotation-media/thumbs-up.webm"
    });
    /* --- save in App --- */
    this.props.highlightsControl.updateAnnotation({
      highlightId: this.props.highlightId,
      annotationIndex: this.props.annotationIndex,
      newContent: "demo-annotation-media/thumbs-up.webm",
      type: this.props.modifiedAnnotation.type
    });
  };

  handleDelete = () => {
    this.props.modalActions.deleteAnnotation(this.props.annotationIndex);
  };

  handleGranted = () => {
    this.setState({ granted: true });
    // console.log("Permission Granted!");
  };
  handleDenied = err => {
    this.setState({ rejectedReason: err.name });
    // console.log("Permission Denied!", err);
  };
  handleStart = stream => {
    if (this.props.canAnnotate && this.props.isOwner) {
      this.setState({
        recording: true
      });

      this.setStreamToVideo(stream);
      // console.log("Recording Started.");
    }
  };
  handleStop = blob => {
    this.setState({
      recording: false
    });

    this.releaseStreamFromVideo();

    // console.log("Recording Stopped.");
    this.downloadVideo(blob);
  };
  handlePause = () => {
    this.releaseStreamFromVideo();

    this.setState({
      paused: true
    });
  };
  handleResume = stream => {
    this.setStreamToVideo(stream);

    this.setState({
      paused: false
    });
  };
  handleError = err => {
    console.log(err);
  };
  setStreamToVideo = stream => {
    let video = this.refs.app.querySelector("video");

    if (window.URL) {
      video.src = window.URL.createObjectURL(stream);
    } else {
      video.src = stream;
    }
  };
  releaseStreamFromVideo = () => {
    this.refs.app.querySelector("video").src = "";
  };
  downloadVideo = blob => {
    let url = URL.createObjectURL(blob);
    this.setState({ videoSrc: url });
  };
  render() {
    const { classes, isAnnotationSaved } = this.props;

    return (
      <div ref="app" className={classes.root}>
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
              <Card
                className={classes.videoContainer}
                style={{ backgroundColor: this.state.recording ? "red" : null }}
              >
                <video
                  loop
                  controls={this.state.videoSrc ? true : false}
                  src={this.state.videoSrc}
                  className={classes.videoPlayer}
                />
              </Card>
              <AnnotationSaveButtons
                handleSave={this.handleSave}
                handleDelete={this.handleDelete}
                isSaved={isAnnotationSaved}
                mediaControl={true}
                isRecording={this.state.recording}
                start={start}
                stop={stop}
                canAnnotate={this.props.canAnnotate}
                isOwner={this.props.isOwner}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AnnotationEditorVideo.propTypes = {
  modifiedAnnotation: PropTypes.object
  // isAnnotationSaved={isAnnotationSaved()}
  // annotationIndex={index}
  // modalActions={modalActions}
  // canAnnotate={canAnnotateHighlight()}
  // isOwner={userId === modifiedAnnotation.userId}
};

export default withStyles(styles)(AnnotationEditorVideo);
