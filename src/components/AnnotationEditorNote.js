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

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import AnnotationSaveButtons from "./AnnotationSaveButtons";

const styles = theme => ({
  root: {
    width: "100%"
  },
  fontStyle: {
    fontSize: theme.typography.fontSize
  },
  annotationButtonsCont: {
    display: "flex",
    justifyContent: "space-between"
  },
  deleteButton: {
    color: grey[700]
  },
  labelStyle: {
    input: {
      fontSize: theme.typography.fontSize + 4
    }
  },
  saveButton: {
    fontSize: theme.typography.fontSize - 4
  }
});

class AnnotationEditorNote extends Component {
  addEmoji = emoji => {
    console.log(emoji);
  };

  handleInputChange = e => {
    /* --- update in modifiedHighlight - not yet saved in App --- */
    this.props.modalActions.updateAnnotation({
      annotationIndex: this.props.annotationIndex,
      content: e.target.value
    });
  };

  handleSave = () => {
    /* --- save in App --- */
    this.props.highlightsControl.updateAnnotation({
      highlightId: this.props.highlightId,
      annotationIndex: this.props.annotationIndex,
      newContent: this.props.modifiedAnnotation.content,
      type: this.props.modifiedAnnotation.type
    });
  };

  handleDelete = () => {
    this.props.modalActions.deleteAnnotation({
      annotationIndex: this.props.annotationIndex
    });
  };

  render() {
    const {
      modifiedAnnotation,
      isAnnotationSaved,
      highlightsControl,
      highlightId,
      annotationIndex,
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.fontStyle}>
          <TextField
            label={isAnnotationSaved ? "Note Saved" : "Changes Not Saved"}
            multiline
            fullWidth
            rowsMax={4}
            placeholder="Your note here"
            value={modifiedAnnotation.content}
            onChange={e => this.handleInputChange(e)}
            className={classes.labelStyle}
          />
        </Typography>
        {/*<Picker onSelect={this.addEmoji} title="EMC eBooks" emoji="book" />*/}
        <AnnotationSaveButtons
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
          isSaved={isAnnotationSaved}
        />
        {/*<div className={classes.annotationButtonsCont}>
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
        </div>*/}
      </div>
    );
  }
}

const propTypes = {};

AnnotationEditorNote.propTypes = propTypes;

export default withStyles(styles)(AnnotationEditorNote);
