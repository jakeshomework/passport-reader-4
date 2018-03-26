import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Button from "material-ui/Button";
import Edit from "material-ui-icons/Edit";
import Mic from "material-ui-icons/Mic";
import Videocam from "material-ui-icons/Videocam";
import Share from "material-ui-icons/Share";

/* ----- COMPONENT IMPORTS ----- */

/*---Opens annotation modal with a annotationType: note, video, or audio---*/
const styles = {};

const AnnotationOptions = ({ updateHighlight, classes }) => {
  return (
    <div>
      <IconButton className={classes.button} aria-label="Note">
        <Edit />
      </IconButton>
      <IconButton className={classes.button} aria-label="Microphone">
        <Mic />
      </IconButton>
      <IconButton className={classes.button} aria-label="Video">
        <Videocam />
      </IconButton>
      <IconButton className={classes.button} aria-label="Share">
        <Share />
      </IconButton>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

AnnotationOptions.propTypes = {
  updateHighlight: PropTypes.func
};

export default withStyles(styles)(AnnotationOptions);
