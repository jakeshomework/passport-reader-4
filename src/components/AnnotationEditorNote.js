import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";

import Typography from "material-ui/Typography";
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

  /* --- Experimental attempt at displaying emoji in an editable div --- */
  /*handleNewInputChange = e => {
    console.log(e.target.innerHTML);
    console.log(e.target.innerHTML.replace(/<[^>]*>/g, ":laughing:"));
  };

  textWithEmoji = () => {
    const emojArray = ["This", "is", "a", ":santa:"];
    return (
      <div
        contentEditable={true}
        onKeyDown={this.handleNewInputChange}
        tabIndex="0"
      >
        {this.props.modifiedAnnotation.content}
        <Emoji
          emoji="santa"
          set="emojione"
          size={16}
          fallback={emoji => {
            console.log(emoji);
          }}
        />
        Alrighty
      </div>
    );
  };*/

  render() {
    const {
      modifiedAnnotation,
      isAnnotationSaved,
      annotationIndex,
      canAnnotate,
      isOwner,
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
          canAnnotate={canAnnotate}
          isOwner={isOwner}
        />
      </div>
    );
  }
}

AnnotationEditorNote.propTypes = {
  highlightId: PropTypes.string,
  modifiedAnnotation: PropTypes.object,
  isAnnotationSaved: PropTypes.bool,
  highlightsControl: PropTypes.object,
  annotationIndex: PropTypes.number,
  modalActions: PropTypes.object,
  canAnnotate: PropTypes.bool,
  isOwner: PropTypes.bool
};

export default withStyles(styles)(AnnotationEditorNote);
