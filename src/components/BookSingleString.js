import React from "react";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  bookStyle: {
    fontSize: theme.typography.fontSize
  }
});
/* ----- COMPONENT IMPORTS ----- */

/*---Handle element based on 'content', 'type', and 'classes'---*/

const BookSingleString = ({
  content,
  handleSelectClick,
  handleSelectTouch,
  handleSelect,
  classes
}) => {
  return (
    <div
      onTouchCancel={handleSelectTouch}
      onClick={handleSelectClick}
      className={classes.bookStyle}
    >
      <Typography className={classes.bookStyle}>
        {renderHTML(content)}
      </Typography>
    </div>
  );
};

BookSingleString.propTypes = {
  element: PropTypes.string
};

export default withStyles(styles)(BookSingleString);
