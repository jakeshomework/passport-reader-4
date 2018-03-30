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
  },
  cancelButton: {
    color: grey[500]
  }
};

class AnnotationSingle extends Component {
  state = {
    modifiedHighlight: this.props.highlight,
    unsavedChanges: false
  };

  handleDelete = () => {
    this.props.highlightsControl.delete(this.props.highlight.id);
  };

  handleSave = () => {
    this.props.annotationModalControl.close();
  };

  handleCancel = () => {
    this.props.annotationModalControl.close();
  };

  componentWillReceiveProps() {
    this.setState({
      // highlightFromProps: this.props.highlight,
      modifiedHighlight: this.props.highlight,
      unsavedChanges: !(this.props.highlight === this.state.modifiedHighlight)
    });
  }

  // TODO: Pass this function down
  handleLocalUpdate = ({ annotationIndex, content }) => {
    this.setState(prevState => {
      let unsavedHighlight = JSON.parse(
        JSON.stringify(prevState.modifiedHighlight)
      );
      unsavedHighlight.annotations[annotationIndex].content = content;

      return {
        modHighlightAnnotations: unsavedHighlight,
        unsavedChanges: !(unsavedHighlight === this.state.modifiedHighlight)
      };
    });
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
          Unsaved Changes: {this.state.unsavedChanges.toString()}
        </Typography>
        <DialogContent>
          <AnnotationOptions
            users={users}
            highlight={highlight}
            highlightsControl={highlightsControl}
            handleLocalUpdate={this.handleLocalUpdate}
          />
        </DialogContent>
        <DialogActions>
          <div className={classes.actions}>
            <Button onClick={this.handleDelete} variant="raised">
              <DeleteIcon />
            </Button>
            <Button
              onClick={this.handleCancel}
              className={classes.cancelButton}
            >
              <CloseIcon />
            </Button>
            <Button onClick={this.handleSave} variant="raised" color="primary">
              <DoneIcon />
            </Button>
          </div>
        </DialogActions>
      </div>
    );
  }
}

const propTypes = {};

AnnotationSingle.propTypes = propTypes;

export default withStyles(styles)(AnnotationSingle);
