import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
/* ----- COMPONENT IMPORTS ----- */
import ColorSelector from "../components/ColorSelector";
import AnnotationSingle from "../components/AnnotationSingle";
import AnnotationMulti from "../components/AnnotationMulti";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_HIGHLIGHT_BY_ID from "../graphql/GET_HIGHLIGHT_BY_ID";
//import UPDATE_HIGHLIGHT from "../graphql/UPDATE_HIGHLIGHT";
//import DELETE_HIGHLIGHT from "../graphql/DELETE_HIGHLIGHT";

/* ----- MATERIAL-UI IMPORTS ----- */
import Button from "material-ui/Button";
import Dialog, { DialogTitle } from "material-ui/Dialog";

import Typography from "material-ui/Typography";

import { withStyles } from "material-ui/styles";
import grey from "material-ui/colors/grey";

/* ----- CONFIG IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";
/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const styles = {
  modalRoot: {
    backgroundColor: "#F0F0F0"
  }
};

const AnnotationModal = ({
  open,
  highlightsIdArray,
  highlights,
  annotationModalControl,
  highlightsControl,
  darkMode,
  users,
  classes
}) => {
  const handleClose = () => {
    annotationModalControl.close();
  };

  const generateTitleStyle = () => {
    return {
      border: "solid",
      // backgroundColor: darkMode ? grey[700] : grey[200],
      backgroundColor: grey[50],
      borderColor:
        highlightsIdArray.length === 1
          ? colorLabels[highlights[highlightsIdArray[0]].color].active
          : grey[700],
      borderWidth: "0px 10px 0px 10px",
      margin: "10px",
      borderRadius: "10px",
      boxShadow:
        "inset 0px 1px 5px 0px rgba(0, 0, 0, 0.2), inset 0px 2px 2px 0px rgba(0, 0, 0, 0.14), inset 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
    };
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.modalRoot }}
    >
      <div style={generateTitleStyle()}>
        {/* --- Check for multiple highlights --- */}
        {highlightsIdArray.length === 1 ? (
          <DialogTitle>
            {highlights[highlightsIdArray[0]].highlightedText}
          </DialogTitle>
        ) : (
          <DialogTitle>-- multiple highlights selected --</DialogTitle>
        )}
      </div>

      {highlightsIdArray.length > 0 ? highlightsIdArray.length > 1 ? (
        <AnnotationMulti
          users={users}
          highlights={highlights}
          highlightsIdArray={highlightsIdArray}
          annotationModalControl={annotationModalControl}
        />
      ) : (
        <AnnotationSingle
          users={users}
          highlight={highlights[highlightsIdArray[0]]}
          annotationModalControl={annotationModalControl}
          highlightsControl={highlightsControl}
        />
      ) : null}
    </Dialog>
  );
};

AnnotationModal.propTypes = {};

export default withStyles(styles)(AnnotationModal);
