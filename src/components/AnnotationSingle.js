import React, { Component } from "react";
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
import SaveIcon from "material-ui-icons/Save";
import grey from "material-ui/colors/grey";

/* ----- COMPONENT IMPORTS ----- */
import AnnotationOptions from "../components/AnnotationOptions";

const styles = theme => ({
  actions: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  highlightAuthor: {
    color: grey[500],
    marginBottom: 10,
    fontSize: theme.typography.fontSize - 5
  },
  grayButton: {
    color: grey[500]
  }
});

class AnnotationSingle extends Component {
  state = {
    modifiedHighlight: this.props.highlight
  };

  modalActions = {
    deleteHighlight: () => {
      this.props.highlightsControl.deleteHighlight(this.props.highlight.id);
    },
    saveAll: () => {
      this.props.highlightsControl.update(this.state.modifiedHighlight);
      this.props.annotationModalControl.close();
    },
    cancel: () => {
      this.props.annotationModalControl.close();
    },
    addAnnotation: ({ annotationIndex, type }) => {
      console.log("adding annotation");

      const newAnnotationObject = {
        userId: this.props.userId,
        type: type,
        createdAt: new Date(),
        updatedAt: new Date(),
        content: ""
      };

      this.setState(prevState => {
        let updatedHighlight = JSON.parse(
          JSON.stringify(prevState.modifiedHighlight)
        );

        updatedHighlight.annotations.push(newAnnotationObject);
        return { modifiedHighlight: updatedHighlight };
      });
    },
    deleteAnnotation: annotationIndex => {
      this.setState(prevState => {
        let updatedHighlight = JSON.parse(
          JSON.stringify(prevState.modifiedHighlight)
        );
        updatedHighlight.annotations.splice(annotationIndex, 1);
        return { modifiedHighlight: updatedHighlight };
      });
    },
    updateAnnotation: ({ annotationIndex, content }) => {
      // console.log(
      //   "now updating annotation",
      //   annotationIndex,
      //   " with ",
      //   content
      // );
      this.setState(prevState => {
        // --- hack avoid shallow clone consequences --- //
        let updatedHighlight = JSON.parse(
          JSON.stringify(prevState.modifiedHighlight)
        );
        updatedHighlight.annotations[annotationIndex].content = content;
        // console.log(updatedHighlight);
        return {
          modifiedHighlight: updatedHighlight
        };
      });
    }
  };

  componentWillReceiveProps() {
    // let newAnnotationFromApp = this.props.highlight.annotations[
    //   this.props.highlight.annotations.length - 1
    // ];
    // this.setState(prevState => {
    //   let updatedHighlight = { ...prevState.modifiedHighlight };
    //   console.log("updaddy", updatedHighlight);
    //   updatedHighlight.annotations.push(newAnnotationFromApp);
    //   return { modifiedHighlight: updatedHighlight };
    // });
  }

  // TODO: Pass this function down
  handleModalUpdate = ({ annotationIndex, content }) => {
    this.setState(prevState => {
      /* --- hack avoid shallow clone consequences --- */
      let updatedHighlight = JSON.parse(
        JSON.stringify(prevState.modifiedHighlight)
      );
      updatedHighlight.annotations[annotationIndex].content = content;

      return {
        modifiedHighlight: updatedHighlight
      };
    });
  };

  isHighlightSaved = () => {
    const modAnnotations = this.state.modifiedHighlight.annotations;
    const savedAnnotations = this.props.highlight.annotations;
    if (modAnnotations.length === savedAnnotations.length) {
      return modAnnotations.every(
        (modAnnotation, index) =>
          modAnnotation.content === savedAnnotations[index].content
      );
    } else return false;
  };

  render() {
    const {
      highlight,
      users,
      annotationModalControl,
      highlightsControl,
      classes
    } = this.props;

    return (
      <div>
        <Typography align="center" className={classes.highlightAuthor}>
          Highlight by{" "}
          {`${users[highlight.userId].firstName} ${users[highlight.userId]
            .lastName} ${moment(highlight.createdAt).fromNow()}`}
        </Typography>
        <Typography align="center">
          Highlight Saved:{this.isHighlightSaved().toString()}
        </Typography>
        <DialogContent>
          <AnnotationOptions
            users={users}
            highlight={highlight}
            modifiedHighlight={this.state.modifiedHighlight}
            highlightsControl={highlightsControl}
            modalActions={this.modalActions}
            isHighlightSaved={this.isHighlightSaved()}
          />
        </DialogContent>
        <DialogActions>
          <div className={classes.actions}>
            <Button
              onClick={this.modalActions.deleteHighlight}
              className={classes.grayButton}
            >
              <DeleteIcon />
            </Button>

            {this.isHighlightSaved() ? (
              <Button
                onClick={this.modalActions.cancel}
                className={classes.grayButton}
              >
                <CloseIcon />
              </Button>
            ) : (
              <Button
                onClick={this.modalActions.saveAll}
                variant="raised"
                color="primary"
              >
                <DoneIcon />
              </Button>
            )}
          </div>
        </DialogActions>
      </div>
    );
  }
}

const propTypes = {};

AnnotationSingle.propTypes = propTypes;

export default withStyles(styles)(AnnotationSingle);
