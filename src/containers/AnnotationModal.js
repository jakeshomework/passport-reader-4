import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- COMPONENT IMPORTS ----- */
import AnnotationSingle from "../components/AnnotationSingle";
import AnnotationMulti from "../components/AnnotationMulti";
import renderHTML from "react-render-html";

/* ----- MATERIAL-UI IMPORTS ----- */
import Dialog, { DialogTitle } from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import grey from "material-ui/colors/grey";

/* ----- CONFIG IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";
/*---Opens up on selection or click on highlight in Book or HighlightsList.---*/

const styles = theme => ({
  modalRoot: {
    backgroundColor: "#F0F0F0",
    borderRadius: "10px"
  },
  fontStyle: {
    fontSize: theme.typography.fontSize
  },
  titleFontStyle: {
    fontSize: theme.typography.fontSize + 2
  },
  titleStyle: {
    border: "solid",
    borderWidth: "0px 10px 0px 10px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow:
      "inset 0px 1px 5px 0px rgba(0, 0, 0, 0.2), inset 0px 2px 2px 0px rgba(0, 0, 0, 0.14), inset 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  }
});

class AnnotationModal extends Component {
  // state = {
  //   highlightEdit: {}
  // };

  // getDerivedStateFromProps() {
  //   this.setState({ highlightEdit: this.props.highlights });
  // }

  handleClose = () => {
    this.props.annotationModalControl.close();
  };

  generateTitleStyle = () => {
    const { highlightsIdArray, highlights } = this.props;
    const { darkMode } = this.props.settings;
    return {
      backgroundColor: darkMode ? grey[700] : grey[200],
      borderColor:
        highlightsIdArray.length === 1
          ? colorLabels[highlights[highlightsIdArray[0]].color].active
          : grey[700]
    };
  };

  render() {
    const {
      open,
      highlightsIdArray,
      highlights,
      annotationModalControl,
      highlightsControl,
      users,
      permissions,
      userId,
      classes
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        classes={{ paper: classes.modalRoot }}
      >
        <Paper>
          <Typography>
            <div
              className={classes.titleStyle}
              style={this.generateTitleStyle()}
            >
              {/* --- Check for multiple highlights --- */}

              {highlightsIdArray.length === 1 ? (
                <DialogTitle>
                  <Typography className={classes.titleFontStyle}>
                    {renderHTML(
                      highlights[highlightsIdArray[0]].highlightedText
                    )}
                  </Typography>
                </DialogTitle>
              ) : (
                <DialogTitle>
                  <Typography className={classes.titleFontStyle}>
                    -- multiple highlights selected --
                  </Typography>
                </DialogTitle>
              )}
            </div>

            {highlightsIdArray.length > 0 ? highlightsIdArray.length > 1 ? (
              <AnnotationMulti
                users={users}
                highlights={highlights}
                highlightsIdArray={highlightsIdArray}
                annotationModalControl={annotationModalControl}
                className={classes.fontStyle}
              />
            ) : (
              <AnnotationSingle
                users={users}
                userId={userId}
                permissions={permissions}
                highlight={highlights[highlightsIdArray[0]]}
                annotationModalControl={annotationModalControl}
                highlightsControl={highlightsControl}
                className={classes.fontStyle}
              />
            ) : null}
          </Typography>
        </Paper>
      </Dialog>
    );
  }
}

AnnotationModal.propTypes = {
  open: PropTypes.bool
  // highlightsIdArray={this.state.annotationModal.highlightsIdArray}
  // highlights={this.state.highlights}
  // annotationModalControl={this.annotationModalControl}
  // users={UsersDemo}
  // userId={this.state.user.userId}
  // highlightsControl={this.highlightsControl}
  // settings={this.state.settings}
  // permissions={this.state.permissions}
};

export default withStyles(styles)(AnnotationModal);
