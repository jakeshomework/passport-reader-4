import React from "react";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

const propTypes = {};

function AnnotationEditorAudio({
  modifiedAnnotation,
  savedAnnotation,
  highlightsControl
}) {
  return <Typography>{modifiedAnnotation.content}</Typography>;
}

AnnotationEditorAudio.propTypes = propTypes;

export default AnnotationEditorAudio;
