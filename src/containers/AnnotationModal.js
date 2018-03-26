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
/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const AnnotationModal = ({
  open,
  highlightsIdArray,
  highlights,
  annotationModalControl
}) => {
  /*---Update highlights array using UPDATE_HIGHLIGHT api.---*/
  const updateHighlight = () => {};
  /*---Delete highlight using DELETE_HIGHLIGHT api.---*/
  const deleteAnnotation = () => {};

  const handleClose = () => {
    console.log("clooosssin");
    annotationModalControl.close();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/*<DialogTitle>Modify Highlight</DialogTitle>*/}
      <DialogContent>
        {highlightsIdArray.length > 0 ? (
          <div>
            <Typography>Highlights here: {highlightsIdArray.join()}</Typography>
            <Typography>
              First startId in list: {highlights[highlightsIdArray[0]].startId}
            </Typography>
          </div>
        ) : null}
        <ColorSelector handleClick={updateHighlight} />
        <AnnotationOptions handleClick={updateHighlight} />
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
