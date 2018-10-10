import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";

/* --- IMPORT EXTERNAL LIBRARIES --- */
import { ReactMic } from "react-mic";
import ContainerDimensions from "react-container-dimensions";

/* ----- COMPONENT IMPORTS ----- */
import AnnotationSaveButtons from "./AnnotationSaveButtons";

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
    if (this.props.highlightsControl !== undefined) {
      this.props.highlightsControl.updateAnnotation({
        highlightId: this.props.highlightId,
        annotationIndex: this.props.annotationIndex,
        newContent: this.state.savedAudioFile,
        type: this.props.modifiedAnnotation.type
      });
    } else console.log("error")

    // this.props.highlightsControl.updateAnnotation({
    //   highlightId: this.props.highlightId,
    //   annotationIndex: this.props.annotationIndex,
    //   newContent: this.state.savedAudioFile,
    //   type: this.props.modifiedAnnotation.type
    // });
  };

  handleDelete = () => {
    this.props.modalActions.deleteAnnotation(this.props.annotationIndex);
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
    const { isAnnotationSaved, classes } = this.props;

    return (
      <div className={classes.audioContainer}>
        <ContainerDimensions>
          {({ width }) => (
            <ReactMic
              record={this.state.record}
              className="sound-wave"
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#ccc"
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

AnnotationEditorAudio.propTypes = {
  modifiedAnnotation: PropTypes.object
  // isAnnotationSaved={isAnnotationSaved()}
  // annotationIndex={index}
  // modalActions={modalActions}
  // canAnnotate={canAnnotateHighlight()}
  // isOwner={userId === modifiedAnnotation.userId}
};

export default withStyles(styles)(AnnotationEditorAudio);
