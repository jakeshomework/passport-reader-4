import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";

import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

const styles = {
  root: {
    width: "100%"
  },
  annotationButtonsCont: {
    display: "flex",
    justifyContent: "space-between"
  },
  deleteButton: {
    color: grey[700]
  }
};

class AnnotationEditorNote extends Component {
  state = {
    content: ""
  };

  componentDidMount() {
    this.setState({
      content: this.props.annotation.content,
      unsavedChanges: false
    });
  }

  handleInputChange = e => {
    this.setState({ content: e.target.value, unsavedChanges: true });
    this.props.handleLocalUpdate({
      annotationIndex: this.props.annotationIndex,
      content: e.target.value
    });
  };

  handleSaveChanges = () => {
    this.props.highlightsControl.updateAnnotation({
      highlightId: this.props.highlightId,
      annotationIndex: this.props.annotationIndex,
      newContent: this.state.content
    });
    this.setState({ unsavedChanges: false });
  };

  handleDelete = () => {
    this.props.highlightsControl.deleteAnnotation({
      highlightId: this.props.highlightId,
      annotationIndex: this.props.annotationIndex
    });
  };

  render() {
    const {
      annotation,
      highlightsControl,
      highlightId,
      annotationIndex,
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          label={this.state.unsavedChanges ? "Changes Not Saved" : "Note Saved"}
          multiline
          fullWidth
          rowsMax={4}
          placeholder="Your note here"
          value={this.state.content}
          onChange={e => this.handleInputChange(e)}
        />
        <div className={classes.annotationButtonsCont}>
          <Button onClick={this.handleDelete} className={classes.deleteButton}>
            <DeleteIcon />
          </Button>

          <Button
            onClick={this.handleSaveChanges}
            className={classes.saveButton}
            disabled={this.state.unsavedChanges ? false : true}
          >
            SAVE
          </Button>
        </div>
      </div>
    );
  }
}

const propTypes = {};

AnnotationEditorNote.propTypes = propTypes;

export default withStyles(styles)(AnnotationEditorNote);
