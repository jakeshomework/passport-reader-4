import React, { Component } from "react";
/* ----- IMPORT LIBRARIES ----- */
import SwipeableViews from "react-swipeable-views";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { withStyles } from "material-ui/styles";

/* ----- IMPORT CONTAINERS ----- */
import Settings from "./containers/Settings";
import Book from "./containers/Book";
import Highlights from "./containers/Highlights";
import Audio from "./containers/Audio";
import SpeedReader from "./containers/SpeedReader";
import AnnotationModal from "./containers/AnnotationModal";
import NavigationMenu from "./containers/NavigationMenu";
import grey from "material-ui/colors/grey";
/* ----- IMPORT UTILITIES ----- */
import { formatBookString } from "./utils/formatBookString";
import {
  openModal,
  closeModal,
  updateModal
} from "./utils/annotationModalUtils.js";
import { updateSettings } from "./utils/settingsUtils";
import {
  addHighlight,
  updateHighlight,
  deleteHighlight
} from "./utils/highlightsUtils";
/* ----- IMPORT DATA ----- */
import { HighlightsDemo } from "./data/highlights.js";
/* ----- IMPORT STYLES ----- */
import { AppStyles } from "./styles/AppStyles.js";

/* ----- BOOK IMPORT (FOGHORN) ----- */
// import { BookString } from "./data/foghorn/content1.js";
// import { BookString } from "./data/foghorn/content1Unformatted.js";

/* ----- BOOK IMPORT (THANK YOU MA'AM IMPORT) ----- */
// import { BookString } from "./data/tym/content1.js";
import { BookString } from "./data/tym/content1Unformatted.js";

/* --- break book into object --- */
const formattedBook = formatBookString(BookString);

const handleChangeIndex = () => {};

const styles = AppStyles;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: "111",
        role: "student",
        allowClassView: false
      },
      book: {
        bookDisplay: formattedBook.bookDisplay,
        asides: formattedBook.asides,
        images: formattedBook.images,
        links: formattedBook.links
      },
      speedReader: { wpm: 250, isPlaying: false, position: 0 },
      audio: {
        isPlaying: false,
        isMenuOpen: false,
        speed: 1,
        playedSeconds: 0,
        totalDuration: 0
      },
      highlights: HighlightsDemo,
      annotationModal: {
        open: false,
        highlightId: "",
        content: {}
      },
      settings: {
        selectedFontFamily: "Open Sans",
        selectedFontSize: 14,
        classView: false,
        focusMode: false,
        showHelpTips: false,
        darkMode: false,
        fontSize: [14, 18, 22],
        fontFamily: ["Open Sans", "Josefin Slab", "Lato"]
      },
      slide: 1
    };
  }

  /* --- make updates to settings --- */
  // changeSettings = updateObject => {
  //   // INPUT: --- { property: value } --- //
  //   const prevSettings = this.state.settings;
  //   const newSettings = {
  //     ...prevSettings,
  //     ...updateObject
  //   };
  //   this.setState({ settings: newSettings });
  // };

  settingsControl = {
    update: updateObject =>
      this.setState(prevState => updateSettings(prevState, updateObject))
  };

  highlightsControl = {
    add: highlightObject =>
      this.setState(prevState => addHighlight(prevState, highlightObject)),
    update: highlightUpdate =>
      this.setState(prevState => updateHighlight(prevState, highlightUpdate)),
    delete: highlightId =>
      this.setState(prevState => deleteHighlight(prevState, highlightId))
  };

  highlightsControl = {
    add: highlightObject =>
      this.setState(prevState => addHighlight(prevState, highlightObject)),
    update: highlightUpdate =>
      this.setState(prevState => updateHighlight(prevState, highlightUpdate)),
    delete: highlightId =>
      this.setState(prevState => deleteHighlight(prevState, highlightId))
  };

  highlightsControl = {
    add: highlightObject =>
      this.setState(prevState => addHighlight(prevState, highlightObject)),
    update: highlightUpdate =>
      this.setState(prevState => updateHighlight(prevState, highlightUpdate)),
    delete: highlightId =>
      this.setState(prevState => deleteHighlight(prevState, highlightId))
  };

  highlightsControl = {
    add: highlightObject =>
      this.setState(prevState => addHighlight(prevState, highlightObject)),
    update: highlightUpdate =>
      this.setState(prevState => updateHighlight(prevState, highlightUpdate)),
    delete: highlightId =>
      this.setState(prevState => deleteHighlight(prevState, highlightId))
  };

  annotationModalControl = {
    close: () => this.setState(prevState => closeModal(prevState)),
    open: highlightId =>
      this.setState(prevState => openModal(prevState, highlightId)),
    update: content =>
      this.setState(prevState => updateModal(prevState, content))
  };

  /* --- control bottom navigation menu --- */
  changeSlideView = index => {
    this.setState({ slide: index });
  };

  render() {
    let fontFamily = this.state.settings.fontFamily;
    let fontSize = this.state.settings.fontSize;

    return (
      <MuiThemeProvider
        theme={createMuiTheme({
          palette: {
            type: this.state.settings.darkMode ? "dark" : "light"
          },
          typography: { fontFamily: fontFamily, fontSize: fontSize }
        })}
      >
        <button
          onClick={() =>
            this.changeSettings({ darkMode: !this.state.settings.darkMode })
          }
        >
          Toggle Dark Mode Test
        </button>
        <AnnotationModal
          open={this.state.annotationModal.open}
          highlightId={this.state.annotationModal.highlightId}
          highlights={this.state.highlights}
          annotationModalControl={this.annotationModalControl}
        />
        <SwipeableViews
          index={this.state.slide}
          onChangeIndex={this.changeSlideView}
          containerStyle={styles.slideContainer}
          style={
            {
              /*this.state.settings.darkMode ? (
              { backgroundColor: grey[800] }
            ) : (
              { backgroundColor: "white" }
            )*/
            }
          }
        >
          <Settings
            settings={this.state.settings}
            settingsControl={this.settingsControl}
            user={this.state.user}
          />
          <Book
            book={this.state.book}
            highlights={this.state.highlights}
            settings={this.state.settings}
            style={Object.assign({}, styles.slide, styles.slide2)}
            annotationModalControl={this.annotationModalControl}
            highlightsControl={this.highlightsControl}
          />
          <Highlights
            highlights={this.state.highlights}
            style={Object.assign({}, styles.slide, styles.highlightsSlide)}
          />
          <Audio style={Object.assign({}, styles.slide, styles.audioSlide)} />
          <SpeedReader
            style={Object.assign({}, styles.slide, styles.speedReaderSlide)}
          />
        </SwipeableViews>
        {/*========== BOTTOM NAVIGATION MENU =========*/}
        <NavigationMenu
          changeSlideView={this.changeSlideView}
          view={this.state.slide}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
