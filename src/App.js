import React, { Component } from "react";
/* ----- IMPORT LIBRARIES ----- */
import SwipeableViews from "react-swipeable-views";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { withStyles } from "material-ui/styles";
import "typeface-roboto";
import "typeface-open-sans";
import "typeface-playfair-display";
import "typeface-montserrat";
import "typeface-lobster";
import "typeface-vt323";
import Paper from "material-ui/Paper";
// import {
//   grey100,
//   grey300,
//   white,
//   darkBlack,
//   fullBlack
// } from "material-ui/colors";

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
import { updateSettings, updatePermissions } from "./utils/settingsUtils";
import {
  addHighlight,
  updateHighlight,
  deleteHighlight,
  addAnnotation,
  updateAnnotation,
  deleteAnnotation,
  newHighlightOpenModal
} from "./utils/highlightsUtils";
import { addHighlightsToBook } from "./utils/addHighlightsToBook";

/* ----- IMPORT DATA ----- */
import { UsersDemo } from "./data/users.js";

/* ----- IMPORT STYLES ----- */
import { AppStyles } from "./styles/AppStyles.js";

/* ----- BOOK IMPORT (FOGHORN) ----- */
import { FoghornString } from "./data/foghorn/content1Unformatted.js";
import { FoghornHighlights } from "./data/foghorn/highlights.js";

/* ----- BOOK IMPORT (THANK YOU MA'AM IMPORT) ----- */
import { TymString } from "./data/tym/content1Unformatted.js";
import { TymHighlights } from "./data/tym/highlights.js";

const defaultBook = "foghorn";
const defaultUser = UsersDemo.user333;

/* --- break book into object --- */
const formattedTym = formatBookString(TymString);
const formattedFoghorn = formatBookString(FoghornString);

const handleChangeIndex = () => {};

const styles = AppStyles;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      book: formattedTym,
      highlights: TymHighlights,
      speedReader: { wpm: 250, isPlaying: false, position: 0 },
      audio: {
        isPlaying: false,
        isMenuOpen: false,
        speed: 1,
        playedSeconds: 0,
        totalDuration: 0
      },
      annotationModal: {
        open: false,
        highlightsIdArray: [],
        content: {}
      },
      permissions: {
        allowClassView: false,
        allowSocialAnnotations: false
      },
      settings: {
        bookId: "123",
        bookName: defaultBook,
        selectedFontFamily: "Helvetica",
        selectedFontSize: 16,
        classView: false,
        focusMode: false,
        showHelpTips: false,
        darkMode: true,
        fontSize: [14, 16, 18, 20, 28],
        fontFamily: [
          "Helvetica",
          "Roboto",
          "Times",
          "Open Sans",
          "Playfair Display",
          "Montserrat",
          "Lobster",
          "vt323"
        ]
      },
      slide: 1
    };
  }

  /* --- make updates to settings --- */
  settingsControl = {
    update: updateObject =>
      this.setState(prevState => updateSettings(prevState, updateObject)),
    changePermissions: updateObject =>
      this.setState(prevState => updatePermissions(prevState, updateObject)),
    changeBook: bookNameObject => {
      if (bookNameObject.bookName === "tym") {
        this.setState({
          book: formattedTym,
          highlights: TymHighlights
        });
      } else if (bookNameObject.bookName === "foghorn") {
        this.setState({
          book: formattedFoghorn,
          highlights: FoghornHighlights
        });
      }
      this.settingsControl.update(bookNameObject);
    },
    changeUser: user => {
      this.setState({ user: UsersDemo[user] });
    }
  };

  highlightsControl = {
    add: highlightObject => {
      let currentHighlights = this.state.highlights;
      this.setState(
        prevState => addHighlight(prevState, highlightObject),
        () =>
          this.annotationModalControl.open(
            newHighlightOpenModal(currentHighlights, this.state.highlights)
          )
      );
      //
    },
    update: highlightUpdate =>
      this.setState(prevState => updateHighlight(prevState, highlightUpdate)),
    deleteHighlight: highlightId => {
      this.setState(prevState => {
        return {
          annotationModal: {
            highlightsIdArray: [],
            open: false
          }
        };
      }),
        this.setState(prevState => deleteHighlight(prevState, highlightId));
    },
    addAnnotation: annotationObject =>
      this.setState(prevState => addAnnotation(prevState, annotationObject)),
    updateAnnotation: annotationObject => {
      this.setState(prevState => updateAnnotation(prevState, annotationObject));
    },
    deleteAnnotation: annotationObject => {
      this.setState(prevState => deleteAnnotation(prevState, annotationObject));
    }
  };

  annotationModalControl = {
    close: () => this.setState(prevState => closeModal(prevState)),
    open: highlightsIdArray => {
      console.log(highlightsIdArray);
      this.setState(prevState => openModal(prevState, highlightsIdArray));
    },
    update: content =>
      this.setState(prevState => updateModal(prevState, content))
  };

  componentDidMount() {
    this.state.settings.bookName === "tym"
      ? this.setState({ book: formattedTym, highlights: TymHighlights })
      : this.setState({
          book: formattedFoghorn,
          highlights: FoghornHighlights
        });
  }

  /* --- control bottom navigation menu --- */
  changeSlideView = index => {
    this.setState({ slide: index });
  };

  render() {
    let selectedFontFamily = this.state.settings.selectedFontFamily;
    let selectedFontSize = this.state.settings.selectedFontSize;

    // --- TODO: FIX ERROR --- why is highlights not an array --- //
    // const highlightsToRender = this.state.classView
    //   ? this.state.highlights
    //   : this.state.highlights.filter(
    //       highlight => highlight.userId === this.state.user.userId
    //     );

    const highlightsToRender = this.state.highlights;

    return (
      <MuiThemeProvider
        theme={createMuiTheme({
          root: {
            fontFamily: selectedFontFamily,
            fontSize: selectedFontSize
          },
          palette: {
            type: this.state.settings.darkMode ? "dark" : "light",
            primary: {
              main: "#4695ec"
            }
          },
          typography: {
            fontFamily: selectedFontFamily,
            fontSize: selectedFontSize
          }
        })}
      >
        <AnnotationModal
          open={this.state.annotationModal.open}
          highlightsIdArray={this.state.annotationModal.highlightsIdArray}
          highlights={this.state.highlights}
          annotationModalControl={this.annotationModalControl}
          darkMode={this.state.settings.darkMode}
          users={UsersDemo}
          highlightsControl={this.highlightsControl}
          settings={this.state.settings}
        />
        <Paper>
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
              permissions={this.state.permissions}
              settingsControl={this.settingsControl}
              user={this.state.user}
            />

            <Book
              book={this.state.book}
              bookDisplayWithHighlights={addHighlightsToBook(
                this.state.book.bookDisplay,
                highlightsToRender
              )}
              highlights={this.state.highlights}
              settings={this.state.settings}
              style={Object.assign({}, styles.slide, styles.slide2)}
              annotationModalControl={this.annotationModalControl}
              highlightsControl={this.highlightsControl}
              settings={this.state.settings}
            />

            <Highlights
              highlights={this.state.highlights}
              style={Object.assign({}, styles.slide, styles.highlightsSlide)}
              annotationModalControl={this.annotationModalControl}
            />
            <Audio style={Object.assign({}, styles.slide, styles.audioSlide)} />
            <SpeedReader
              style={Object.assign({}, styles.slide, styles.speedReaderSlide)}
            />
          </SwipeableViews>
        </Paper>

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
