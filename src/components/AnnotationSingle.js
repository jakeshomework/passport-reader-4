import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
/* ----- MATERIAL-UI IMPORTS ----- */
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import DeleteIcon from "material-ui-icons/Delete";
import CloseIcon from "material-ui-icons/Close";
import DoneIcon from "material-ui-icons/Done";
import ShareIcon from "material-ui-icons/Share";
import grey from "material-ui/colors/grey";

/* ----- COMPONENT IMPORTS ----- */
import AnnotationOptions from "../components/AnnotationOptions";

const styles = {
  actions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  highlightAuthor: {
    color: grey[500],
    marginBottom: 10
  }
};

function AnnotationSingle({
  highlight,
  users,
  annotationModalControl,
  highlightsControl,
  classes
}) {
  const handleDelete = () => {
    highlightsControl.delete(highlight.id);
  };

  const handleSave = () => {
    annotationModalControl.close();
  };

  const handleUpdate = () => {};

  return (
    <div>
      <Typography align="center" className={classes.highlightAuthor}>
        Highlight by{" "}
        {`${users[highlight.userId].firstName} ${users[highlight.userId]
          .lastName} ${moment(highlight.createdAt).fromNow()}`}
      </Typography>
      <DialogContent>
        <AnnotationOptions
          highlight={highlight}
          handleClick={handleUpdate}
          users={users}
        />
      </DialogContent>
      <DialogActions>
        <div className={classes.actions}>
          <Button onClick={handleDelete} variant="raised">
            <DeleteIcon />
          </Button>
          <Button onClick={handleDelete}>
            <ShareIcon />
          </Button>
          <Button onClick={handleSave} variant="raised" color="primary">
            <DoneIcon />
          </Button>
        </div>
      </DialogActions>
    </div>
  );
}

const propTypes = {};

AnnotationSingle.propTypes = propTypes;

export default withStyles(styles)(AnnotationSingle);
