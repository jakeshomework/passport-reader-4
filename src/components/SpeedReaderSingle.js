import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
/* ----- COMPONENT IMPORTS ----- */

/*---Display a single word in the speed reader.---*/
const styles = theme => ({
  word: {
    textAlign: "center",
    padding: 20
  },
  container: {
    marginTop: "30vh"
  },
  wordContainer: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000"
  }
});
const SpeedReaderSingle = ({ word, classes }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wordContainer}>
        <Typography className={classes.word}>{word}</Typography>
      </div>
    </div>
  );
};

SpeedReaderSingle.propTypes = {
  word: PropTypes.string
};

export default withStyles(styles)(SpeedReaderSingle);
