import React from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import RecordIcon from "material-ui-icons/FiberManualRecord";
import StopIcon from "material-ui-icons/Stop";

const styles = theme => ({
  annotationButtonsCont: {
    display: "flex",
    justifyContent: "space-between"
  },

  saveButton: {
    fontSize: theme.typography.fontSize - 4
  },
  recorderButton: {
    width: 50,
    height: 50
  }
});

function AnnotationSaveButtons({
  isSaved,
  handleSave,
  handleDelete,
  mediaControl,
  start,
  stop,
  isRecording,
  canAnnotate,
  isOwner,
  classes
}) {
  return (
    <div className={classes.annotationButtonsCont}>
      <Button
        onClick={handleDelete}
        className={classes.deleteButton}
        disabled={!isOwner}
      >
        <DeleteIcon />
      </Button>

      {mediaControl ? (
        <div className={classes.recorderButtonsContainer}>
          {isRecording ? (
            <IconButton onClick={stop}>
              <StopIcon className={classes.recorderButton} />
            </IconButton>
          ) : (
            <IconButton onClick={start}>
              <RecordIcon
                className={classes.recorderButton}
                style={{ color: "red" }}
              />
            </IconButton>
          )}
        </div>
      ) : null}

      <Button
        onClick={handleSave}
        className={classes.saveButton}
        disabled={isSaved ? true : false}
      >
        SAVE
      </Button>
    </div>
  );
}

AnnotationSaveButtons.propTypes = {
  handleSave: PropTypes.func
  // handleDelete={this.handleDelete}
  // isSaved={isAnnotationSaved}
  // mediaControl={true}
  // isRecording={this.state.recording}
  // start={start}
  // stop={stop}
  // canAnnotate={this.props.canAnnotate}
  // isOwner={this.props.isOwner}
};

export default withStyles(styles)(AnnotationSaveButtons);
