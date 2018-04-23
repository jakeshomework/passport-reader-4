import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- MATERIAL-UI IMPORTS ----- */
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";
import { withStyles } from "material-ui/styles";
/* --- IMPORT EXTERNAL LIBRARIES --- */
import { ReactMic } from "react-mic";
import ContainerDimensions from "react-container-dimensions";
/* ----- COMPONENT IMPORTS ----- */
import AnnotationSaveButtons from "./AnnotationSaveButtons";

const propTypes = {};

const styles = {
  audioContainer: {
    width: "100%"
  }
};

class AnnotationEditorAudio extends Component {
  constructor() {
    super();
    this.state = {
      record: false,
      savedAudioFile: ""
    };
  }

  handleSave = () => {
    this.props.highlightsControl.updateAnnotation({
      highlightId: this.props.highlightId,
      annotationIndex: this.props.annotationIndex,
      newContent: this.state.savedAudioFile,
      type: this.props.modifiedAnnotation.type
    });
  };

  handleDelete = () => {
    this.props.modalActions.deleteAnnotation({
      annotationIndex: this.props.annotationIndex
    });
  };

  startRecording = () => {
    if (this.props.canAnnotate && this.props.isOwner) {
      this.setState({
        record: true
      });
    }
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);
  }

  render() {
    const {
      modifiedAnnotation,
      savedAnnotation,
      highlightsControl,
      isAnnotationSaved,
      classes
    } = this.props;

    return (
      <div className={classes.audioContainer}>
        <ContainerDimensions>
          {({ width }) => (
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#FF4081"
              width={width}
            />
          )}
        </ContainerDimensions>
        <AnnotationSaveButtons
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
          isSaved={isAnnotationSaved}
          mediaControl={true}
          isRecording={this.state.record}
          start={this.startRecording}
          stop={this.stopRecording}
          isOwner={this.props.isOwner}
        />
      </div>
    );
  }
}

AnnotationEditorAudio.propTypes = propTypes;

export default withStyles(styles)(AnnotationEditorAudio);
