import React from "react";
import PropTypes from "prop-types";
/* ----- MATERIAL-UI IMPORTS ----- */
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";
import { withStyles } from "material-ui/styles";
import grey from "material-ui/colors/grey";

const propTypes = {};

const styles = theme => ({
  annotationButtonsCont: {
    display: "flex",
    justifyContent: "space-between"
  },
  deleteButton: {
    color: grey[700]
  },
  saveButton: {
    fontSize: theme.typography.fontSize - 4
  }
});

function AnnotationSaveButtons({ isSaved, handleSave, handleDelete, classes }) {
  return (
    <div className={classes.annotationButtonsCont}>
      <Button onClick={handleDelete} className={classes.deleteButton}>
        <DeleteIcon />
      </Button>

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

AnnotationSaveButtons.propTypes = propTypes;

export default withStyles(styles)(AnnotationSaveButtons);
