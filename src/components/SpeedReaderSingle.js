import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
/* ----- COMPONENT IMPORTS ----- */

/*---Display a single word in the speed reader.---*/

const SpeedReaderSingle = ({ word }) => {
  return (
    <div>
      <Typography>{word}</Typography>
    </div>
  );
};

SpeedReaderSingle.propTypes = {
  word: PropTypes.string
};

export default SpeedReaderSingle;
