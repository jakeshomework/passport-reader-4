import React from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import AnnotationColorSelector from "../components/AnnotationColorSelector";
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
/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const AnnotationModal = ({
  open,
  highlightId,
  highlights,
  annotationModalControl
}) => {
  /*---Update highlights array using UPDATE_HIGHLIGHT api.---*/
  const updateAnnotation = () => {};
  /*---Delete highlight using DELETE_HIGHLIGHT api.---*/
  const deleteAnnotation = () => {};

  const handleClose = () => {
    console.log("clooosssin");
    annotationModalControl.close();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modify Highlight</DialogTitle>
      <DialogContent>
        <AnnotationColorSelector updateHighlight="func" />
        <AnnotationOptions updateHighlight="func" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.updateAnnotation} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AnnotationModal.propTypes = {};

export default AnnotationModal;
