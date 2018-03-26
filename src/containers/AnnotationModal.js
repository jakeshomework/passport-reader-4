import React from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import ColorSelector from "../components/ColorSelector";
import AnnotationOptions from "../components/AnnotationOptions";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHT_BY_ID from "../graphql/GET_HIGHLIGHT_BY_ID";
//import UPDATE_HIGHLIGHT from "../graphql/UPDATE_HIGHLIGHT";
//import DELETE_HIGHLIGHT from "../graphql/DELETE_HIGHLIGHT";

/* ----- MATERIAL-UI IMPORTS ----- */
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import DeleteIcon from "material-ui-icons/Delete";
import DoneIcon from "material-ui-icons/Done";
import { withStyles } from "material-ui/styles";
import grey from "material-ui/colors/grey";

/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const styles = {};

const AnnotationModal = ({
  open,
  highlightsIdArray,
  highlights,
  annotationModalControl,
  darkMode,
  classes
}) => {
  /* --- close modal without saving changes --- */
  const handleCancel = () => {};
  /* --- Update highlights array using UPDATE_HIGHLIGHT api. --- */
  const handleSave = () => {};
  /* --- Delete highlight using DELETE_HIGHLIGHT api. --- */
  const handleDelete = () => {};

  const handleClose = () => {
    annotationModalControl.close();
  };

  const generateTitleStyle = () => {
    return {
      border: "solid",
      backgroundColor: darkMode ? grey[700] : grey[200],
      borderColor:
        highlightsIdArray.length === 1
          ? highlights[highlightsIdArray[0]].active
          : grey[100],
      borderWidth: "0px 10px 0px 10px",
      margin: "10px",
      borderRadius: "10px",
      boxShadow:
        "inset 0px 1px 5px 0px rgba(0, 0, 0, 0.2), inset 0px 2px 2px 0px rgba(0, 0, 0, 0.14), inset 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
    };
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={generateTitleStyle()}>
        {highlightsIdArray.length === 1 ? (
          <DialogTitle>
            {highlights[highlightsIdArray[0]].highlightedText}
          </DialogTitle>
        ) : (
          <DialogTitle>
            Multiple Highlights Selected -- import Highlight Component
          </DialogTitle>
        )}
      </div>

      <DialogContent>
        {highlightsIdArray.length > 0 ? (
          <div>
            <Typography>Highlights here: {highlightsIdArray.join()}</Typography>
            <Typography>
              First startId in list: {highlights[highlightsIdArray[0]].startId}
            </Typography>
          </div>
        ) : null}
        <ColorSelector handleClick={this.handleUpdate} />
        <AnnotationOptions handleClick={this.handleUpdate} />
      </DialogContent>
      <DialogActions>
        <div className={classes.container}>
          <Button onClick={handleDelete} variant="raised">
            <DeleteIcon />
          </Button>
          <Button onClick={handleCancel} variant="raised">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="raised" color="primary">
            <DoneIcon />
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

AnnotationModal.propTypes = {};

export default withStyles(styles)(AnnotationModal);
