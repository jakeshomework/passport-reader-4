import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import MobileStepper from "material-ui/MobileStepper";
import Button from "material-ui/Button";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";

const styles = {
  root: {
    //maxWidth: 400,
    background: "transparent",
    // height: "100%",
    // backgroundColor: "red",
    position: "absolute",
    right: "10%",
    width: "80%",
    marginTop: "530px",
    justifyContent: "center"
  }
};

class FlashCardStepper extends React.Component {
  handleNext = () => {
    this.props.handleNext();
  };

  handleBack = () => {
    this.props.handleBack();
  };

  handleKeyPress = e => {
    if (
      (e.code === "KeyA" || e.code === "ArrowLeft") &&
      this.props.activeStep > 0
    ) {
      // console.log("make it decrease");
      this.handleBack();
    } else if (
      (e.code === "KeyD" || e.code === "ArrowRight") &&
      this.props.activeStep < this.props.length - 1
    ) {
      // console.log("make it increase");
      this.handleNext();
    } else if (e.code === "Space") {
      // console.log("make it flip");
    } else {
      // console.log(e.code);
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <MobileStepper
          type="progress"
          steps={this.props.length}
          position="static"
          activeStep={this.props.activeStep}
          className={classes.root}
          nextButton={
            <Button
              dense
              onClick={this.handleNext}
              disabled={this.props.activeStep === this.props.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              dense
              onClick={this.handleBack}
              disabled={this.props.activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

FlashCardStepper.propTypes = {
  activeStep: PropTypes.number,
  classes: PropTypes.object,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  length: PropTypes.number
};

export default withStyles(styles)(FlashCardStepper);
