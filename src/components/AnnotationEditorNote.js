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
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import EmojiIcon from "material-ui-icons/TagFaces";
import grey from "material-ui/colors/grey";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "material-ui/ExpansionPanel";

import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";

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
    if (this.props.canAnnotate && this.props.isOwner) {
      this.props.modalActions.updateAnnotation({
        annotationIndex: this.props.annotationIndex,
        content: e.target.value
      });
    }
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
    this.props.modalActions.deleteAnnotation(this.props.annotationIndex);
  };

  handleNewInputChange = e => {
    console.log(e);
  };

  textWithEmoji = () => {
    return (
      <div
        contentEditable={true}
        onKeyDown={this.handleNewInputChange}
        tabIndex="0"
      >
        Looks good to me
        <span
          contentEditable={false}
          dangerouslySetInnerHTML={{
            __html: Emoji({
              html: true,
              set: "apple",
              emoji: "+1",
              size: 24
            })
          }}
        />
        Alrighty
      </div>
    );
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
            onChange={e => this.handleInputChange(e)}
            className={classes.labelStyle}
          />
        </Typography>

        {this.textWithEmoji()}

        <ExpansionPanel style={{ borderRadius: "0px 0px 10px 10px" }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <EmojiIcon />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Picker
              onSelect={this.addEmoji}
              title="EMC eBooks"
              emoji="book"
              style={{ width: "100%" }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <AnnotationSaveButtons
          handleSave={this.handleSave}
          handleDelete={this.handleDelete}
          isSaved={isAnnotationSaved}
          canAnnotate={this.props.canAnnotate}
          isOwner={this.props.isOwner}
        />
      </div>
    );
  }
}

const propTypes = {};

AnnotationEditorNote.propTypes = propTypes;

export default withStyles(styles)(AnnotationEditorNote);
