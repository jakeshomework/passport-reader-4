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
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

/* ----- COMPONENT IMPORTS ----- */

/*---Opens annotation modal with a annotationType: note, video, or audio---*/
const styles = {
  icon: { color: grey[600], marginRight: 20 },
  addAnnotationIcon: {
    backgroundColor: "#eeab46",
    display: "flex",
    justifyContent: "space-around"
  }
};

const AnnotationOptions = ({ highlight, users, classes }) => {
  console.log(highlight.annotations);
  return (
    <div>
      {highlight.annotations.map((annotation, index) => {
        return (
          <ExpansionPanel
            style={index === 0 ? { borderRadius: "10px 10px 0px 0px" } : null}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {annotation.type === "video" ? (
                <VideocamIcon className={classes.icon} />
              ) : annotation.type === "audio" ? (
                <MicIcon className={classes.icon} />
              ) : annotation.type === "note" ? (
                <NoteIcon className={classes.icon} />
              ) : null}
              <Typography className={classes.heading}>
                Created by {users[annotation.userId].firstName}{" "}
                {users[annotation.userId].lastName}{" "}
                {moment(annotation.createdAt).fromNow()}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{annotation.content}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <div
        className={classes.addAnnotationIcon}
        style={
          highlight.annotations.length > 0 ? (
            { borderRadius: "0px 0px 10px 10px" }
          ) : (
            { borderRadius: "10px 10px 10px 10px" }
          )
        }
      >
        <IconButton className={classes.button} aria-label="Note">
          <NoteIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="Microphone">
          <MicIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="Video">
          <VideocamIcon />
        </IconButton>
      </div>
    </div>
  );
};

AnnotationOptions.propTypes = {
  updateHighlight: PropTypes.func
};

export default withStyles(styles)(AnnotationOptions);
