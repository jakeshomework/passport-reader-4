import React from "react";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";

/* ----- UI IMPORTS ----- */
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

/*---Display a single word in the speed reader.---*/
const styles = theme => ({
  word: {
    //textAlign: "center",
    padding: 20,
    fontSize: theme.typography.fontSize + 10
  },
  container: {
    marginTop: "30vh"
  },
  wordContainer: {
    borderTop: "1px solid #000",
    paddingBottom: 38,
    borderBottom: "1px solid #000",
    display: "flex"
    //flexFlow: "row"
  },
  left: { backgroundColor: "#ccc" },
  right: { backgroundColor: "#ccc" },
  middle: {
    color: "red",
    backgroundColor: "yellow",
    justifyContent: "center"
  },

  lineTop: {
    //display: "block",
    height: 10,
    width: 1,
    border: 0,
    backgroundColor: "#000",
    justifyContent: "center",
    display: "flex",
    margin: 0,
    padding: 0
  }
});
const SpeedReaderSingle = ({ wordBegin, wordMiddle, wordEnd, classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wordContainer}>
        <span className={classes.lineTop} />
        <Typography className={classes.word}>
          <span className={classes.seperateLeft} />
          <span className={classes.seperateRight} />
          <span className={classes.left}>{renderHTML(wordBegin)}</span>
          <span className={classes.middle}>{renderHTML(wordMiddle)}</span>
          <span className={classes.right}>{renderHTML(wordEnd)}</span>
          {/* <span className={classes.seperateLeft} />
          <span className={classes.lineBottom} />
          <span className={classes.seperateRight} /> */}
        </Typography>
      </div>
    </div>
  );
};

SpeedReaderSingle.propTypes = {
  word: PropTypes.string
};

export default withStyles(styles)(SpeedReaderSingle);
