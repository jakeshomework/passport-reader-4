import React from "react";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";

/* ----- UI IMPORTS ----- */
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

/*---Display a single word in the speed reader.---*/
const styles = theme => ({
  rootContainer: {
    marginTop: "30vh"
  },
  speedContainer: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    display: "flex",
    justifyContent: "center"
  },
  lineTop: {
    height: 10,
    top: 10,
    width: 3,
    backgroundColor: "#000",
    position: "relative",
    marginLeft: "50%"
  },
  lineBottom: {
    height: 10,
    width: 3,
    backgroundColor: "#000",
    position: "relative",
    bottom: 10,
    marginLeft: "50%"
  },
  wordContainer: {
    justifyContent: "center",
    display: "flex",
    padding: 20
  },
  left: {
    order: 1,
    minWidth: "100%",
    textAlign: "right",
    fontSize: theme.typography.fontSize + 12
  },
  middle: {
    color: "red",

    order: 2,
    fontSize: theme.typography.fontSize + 12
  },
  right: {
    order: 3,
    minWidth: "100%",
    fontSize: theme.typography.fontSize + 12
  }
});
const SpeedReaderSingle = ({ wordBegin, wordMiddle, wordEnd, classes }) => {
  return (
    <div className={classes.rootContainer}>
      <div className={classes.lineTop} />
      <div className={classes.speedContainer}>
        <div className={classes.wordContainer}>
          <Typography className={classes.left}>
            {renderHTML(wordBegin)}
          </Typography>
          <Typography className={classes.middle}>
            {renderHTML(wordMiddle)}
          </Typography>
          <Typography className={classes.right}>
            {renderHTML(wordEnd)}
          </Typography>
        </div>
      </div>
      <div className={classes.lineBottom} />
    </div>
  );
};

SpeedReaderSingle.propTypes = {
  word: PropTypes.string
};

export default withStyles(styles)(SpeedReaderSingle);
