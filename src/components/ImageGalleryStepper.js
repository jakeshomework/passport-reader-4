import React from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";

import { withStyles } from "material-ui/styles";

/*---Switch image in gallery.---*/
const styles = {};

const ImageGalleryStepper = ({
  handleBack,
  handleNext,
  closeGallery,
  position,
  length,
  classes
}) => {
  return (
    <div>
      <MobileStepper
        type="dots"
        steps={length}
        position="bottom"
        maxWidth="xs"
        activeStep={position}
        backButton={
          <Button dense onClick={handleBack} disabled={position === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
        nextButton={
          <Button dense onClick={handleNext} disabled={position === length - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
      />
    </div>
  );
};

ImageGalleryStepper.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  closeGallery: PropTypes.func,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  length: PropTypes.number,
  position: PropTypes.number
};

export default withStyles(styles)(ImageGalleryStepper);
