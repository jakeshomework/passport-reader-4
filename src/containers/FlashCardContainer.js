import React from "react";
import PropTypes from "prop-types";
/* ----- MATERIAL-UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import { spring } from "react-motion";
import Shuffle from "material-ui-icons/Shuffle";
/* ----- COMPONENT IMPORTS ----- */
import FlashCard from "../components/FlashCard";
import FlashCardStepper from "../components/FlashCardStepper";

const styles = {
  appBar: {
    position: "relative",
    alignItems: "center"
  },
  flex: {
    flex: 1
  },
  background: {
    // backgroundColor: grey[500]
  },
  toolBarStyle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "960px"
  },
  stepperStyles: {
    display: "absolute",
    width: "80%"
  }
};

class FlashCardContainer extends React.Component {
  state = {
    open: false,
    activeStep: 0,
    reverse: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleShuffle = () => {
    let random = Math.random();
    let randomStep = Math.floor(random * this.props.studySet.length);
    randomStep === this.state.activeStep
      ? this.handleShuffle()
      : this.setState({
          activeStep: randomStep
        });
  };

  displayFlashcards = () => {
    if (this.props.studySet !== undefined) {
      let studySet = this.props.studySet;

      // let studyItem = studySet ? studySet[this.state.activeStep] : false;

      return studySet.map((studyItem, i) => {
        let cardContent = {};
        if (studyItem) {
          if (!studyItem.savedDictionary || studyItem.savedDictionary.error) {
            /*** HANDLE NON-DICTIONARY HIGHLIGHT ***/
            cardContent.frontPrimary = studyItem.selectedText;
            cardContent.backPrimary = studyItem.note;
            cardContent.frontCategory = "Highlight";
            cardContent.backCategory = "Note";
          } else if (
            /*** HANDLE HIGHLIGHT WITH SAVED DICTIONARY ***/
            studyItem.savedDictionary ||
            !studyItem.savedDictionary.error
          ) {
            let dic = studyItem.savedDictionary;
            cardContent.frontPrimary = studyItem.selectedText;
            cardContent.frontSub =
              dic.definitions[dic.definitionIndex].speech_part;
            cardContent.frontCategory = "Word";
            cardContent.backCategory = "Definition";
            cardContent.backPrimary = dic.definitions[dic.definitionIndex].def;
            cardContent.backSub = dic.definitions[dic.definitionIndex].example;
            cardContent.backSecondary = studyItem.note;
          }
          cardContent.buttonText = "Flip";
          /*** SET POSITION OF CARD ***/
          cardContent.position =
            i < this.state.activeStep
              ? "left"
              : i > this.state.activeStep ? "right" : "center";
        }

        return (
          <div key={studyItem._id}>
            <FlashCard data={cardContent} />
          </div>
        );
      });
    }
  };

  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return { width: spring(0), height: spring(0) };
  }

  render() {
    const { classes } = this.props;

    /*** BUILD THE CARDCONTENT (FROM STUDYSET) HERE ***/

    return (
      <div>
        <Button raised onClick={this.handleClickOpen}>
          Open Study Mode
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" className={classes.background} />}
        >
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBarStyle}>
              <IconButton
                color="contrast"
                onClick={this.handleRequestClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>

              <Typography
                type="title"
                color="inherit"
                className={classes.flex}
                onClick={this.handleRequestClose}
              >
                STUDY MODE
              </Typography>
              <div>
                <Button color="contrast" onClick={this.handleShuffle}>
                  shuffle<Shuffle />
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          {this.displayFlashcards()}
          <FlashCardStepper
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            activeStep={this.state.activeStep}
            length={this.props.studySet ? this.props.studySet.length : 0}
            className={classes.stepperStyles}
          />
        </Dialog>
      </div>
    );
  }
}

FlashCardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlashCardContainer);