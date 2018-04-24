import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
/* ----- MATERIAL-UI IMPORTS ----- */
import Button from "material-ui/Button";
import { DialogActions, DialogContent } from "material-ui/Dialog";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import Badge from "material-ui/Badge";
import { withStyles } from "material-ui/styles";
import CloseIcon from "material-ui-icons/Close";
import grey from "material-ui/colors/grey";

/* ----- CONFIG IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";

const styles = theme => ({
  chipCont: {
    marginBottom: 20
  },
  label: {
    width: "100%",
    overflow: "hidden",
    fontSize: theme.typography.fontSize - 6
    // boxShadow:
    //   "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
  },
  chipLabel: {
    width: "100%"
  },
  chipLabelMeta: {
    width: "100%",
    color: grey[500],
    display: "flex",
    justifyContent: "space-between"
  },
  badge: {
    width: "100%"
  },
  chip: {
    width: "100%",
    justifyContent: "flex-start",
    fontSize: theme.typography.fontSize - 4,
    padding: "10px"
  }
});

function AnnotationMulti({
  highlightsIdArray,
  highlights,
  users,
  annotationModalControl,
  classes
}) {
  const handleOpenSingle = highlightId => {
    annotationModalControl.open([highlightId]);
  };
  const handleClose = () => {
    annotationModalControl.close();
  };

  return (
    <div>
      <DialogContent>
        <div>
          {highlightsIdArray.map(highlightId => {
            const highlight = highlights[highlightId];
            const user = users[highlight.userId];

            const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
            const createdDate = moment(highlight.createdAt).fromNow();

            const generateChipLabel = (
              <div className={classes.chipLabel}>
                <div>{highlight.highlightedText}</div>
                <div className={classes.chipLabelMeta}>
                  <div>{colorLabels[highlight.color].label}</div>
                  <div>{createdDate}</div>
                </div>
              </div>
            );

            return (
              <div className={classes.chipCont}>
                <Badge
                  badgeContent={highlight.annotations.length}
                  color="primary"
                  className={classes.badge}
                >
                  <Chip
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: colorLabels[highlight.color].active
                        }}
                      >
                        {initials}
                      </Avatar>
                    }
                    label={generateChipLabel}
                    onClick={() => handleOpenSingle(highlightId)}
                    className={classes.chip}
                    classes={{ label: classes.label }}
                  />
                </Badge>
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <div className={classes.container}>
          <Button onClick={handleClose} variant="raised" color="primary">
            <CloseIcon />
          </Button>
        </div>
      </DialogActions>
    </div>
  );
}

const propTypes = {
  users: PropTypes.object
  // highlights={highlights}
  // highlightsIdArray={highlightsIdArray}
  // annotationModalControl={annotationModalControl}
};

AnnotationMulti.propTypes = propTypes;

export default withStyles(styles)(AnnotationMulti);
