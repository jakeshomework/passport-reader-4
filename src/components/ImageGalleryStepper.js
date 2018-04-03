import React from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";

/*---Switch image in gallery.---*/

const ImageGalleryStepper = ({ handleBack, handleNext, position, length }) => {
  return (
    <div>
      <MobileStepper
        type="dots"
        steps={length}
        position="static"
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
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  position: PropTypes.number,
  length: PropTypes.number
};

export default ImageGalleryStepper;
