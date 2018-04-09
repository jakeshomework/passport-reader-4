import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Button from "material-ui/Button";
import Card from "material-ui/Card";
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

/* ----- COMPONENT IMPORTS ----- */
import AnnotationEditorAudio from "./AnnotationEditorAudio";
import AnnotationEditorVideo from "./AnnotationEditorVideo";
import AnnotationEditorNote from "./AnnotationEditorNote";

/*---Opens annotation modal with a annotationType: note, video, or audio---*/
const styles = theme => ({
  icon: {
    // color: grey[600],
    marginRight: 20
  },
  annotationContainer: {
    width: "100%"
  },
  addAnnotationIcons: {
    // backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "space-around",
    padding: 10
  },
  fontStyle: {
    fontSize: theme.typography.fontSize - 2,
    fontFamily: theme.typography.fontFamily
  }
});

const AnnotationOptions = ({
  highlight,
  modifiedHighlight,
  users,
  highlightsControl,
  modalActions,
  isHighlightSaved,
  classes
}) => {
  const handleAddAnnotation = type => {
    modalActions.addAnnotation({
      highlightId: highlight.id,
      type: type
    });
  };
  const annotationButtonsDisabled = () => {
    /* --- return true to disable add annotation buttons --- */
    if (modifiedHighlight.annotations.length === 0) {
      return false;
    } else return !isHighlightSaved;
  };

  return (
    <div>
      {modifiedHighlight.annotations.map((modifiedAnnotation, index) => {
        const savedAnnotation = highlight.annotations[index];

        const isAnnotationSaved = () => {
          const modified = modifiedAnnotation.content;
          const saved = savedAnnotation ? savedAnnotation.content : null;
          return modified === saved;
        };
        return (
          <ExpansionPanel
            style={index === 0 ? { borderRadius: "10px 10px 0px 0px" } : null}
            defaultExpanded={!isAnnotationSaved()}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {modifiedAnnotation.type === "video" ? (
                <VideocamIcon className={classes.icon} />
              ) : modifiedAnnotation.type === "audio" ? (
                <MicIcon className={classes.icon} />
              ) : modifiedAnnotation.type === "note" ? (
                <NoteIcon className={classes.icon} />
              ) : null}
              <Typography className={classes.fontStyle}>
                Created by {users[modifiedAnnotation.userId].firstName}{" "}
                {users[modifiedAnnotation.userId].lastName}{" "}
                {moment(modifiedAnnotation.createdAt).fromNow()}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionDetails}>
              {modifiedAnnotation.type === "video" ? (
                <AnnotationEditorVideo
                  highlightId={highlight.id}
                  modifiedAnnotation={modifiedAnnotation}
                  isAnnotationSaved={isAnnotationSaved()}
                  highlightsControl={highlightsControl}
                  annotationIndex={index}
                  modalActions={modalActions}
                  className={classes.annotationContainer}
                />
              ) : modifiedAnnotation.type === "audio" ? (
                <AnnotationEditorAudio
                  highlightId={highlight.id}
                  modifiedAnnotation={modifiedAnnotation}
                  isAnnotationSaved={isAnnotationSaved()}
                  highlightsControl={highlightsControl}
                  annotationIndex={index}
                  modalActions={modalActions}
                />
              ) : modifiedAnnotation.type === "note" ? (
                <AnnotationEditorNote
                  highlightId={highlight.id}
                  modifiedAnnotation={modifiedAnnotation}
                  isAnnotationSaved={isAnnotationSaved()}
                  highlightsControl={highlightsControl}
                  annotationIndex={index}
                  modalActions={modalActions}
                />
              ) : null}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <Card
        className={classes.addAnnotationIcons}
        style={
          modifiedHighlight.annotations.length > 0 ? (
            { borderRadius: "0px 0px 10px 10px" }
          ) : (
            { borderRadius: "10px 10px 10px 10px" }
          )
        }
      >
        <Button
          className={classes.button}
          aria-label="Note"
          onClick={() => handleAddAnnotation("note")}
          disabled={annotationButtonsDisabled()}
          size="small"
        >
          <NoteIcon />
        </Button>
        <Button
          className={classes.button}
          aria-label="Microphone"
          onClick={() => handleAddAnnotation("audio")}
          disabled={annotationButtonsDisabled()}
          size="small"
          color="default"
        >
          <MicIcon />
        </Button>
        <Button
          className={classes.button}
          aria-label="Video"
          onClick={() => handleAddAnnotation("video")}
          disabled={annotationButtonsDisabled()}
          size="small"
          color="default"
        >
          <VideocamIcon />
        </Button>
      </Card>
    </div>
  );
};

AnnotationOptions.propTypes = {
  updateHighlight: PropTypes.func
};

export default withStyles(styles)(AnnotationOptions);
