import React, { Component } from "react";

/* ----- IMPORT LIBRARIES ----- */
import SwipeableViews from "react-swipeable-views";

/* ----- IMPORT FONTS ----- */
import "typeface-roboto";
import "typeface-open-sans";
import "typeface-playfair-display";
import "typeface-montserrat";
import "typeface-lobster";
import "typeface-vt323";

/* ----- MATERIAL-UI IMPORTS ----- */
import Paper from "material-ui/Paper";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { withStyles } from "material-ui/styles";

/* ----- IMPORT CONTAINERS ----- */
import Settings from "./containers/Settings";
import Book from "./containers/Book";
import Highlights from "./containers/Highlights";
import SpeedReader from "./containers/SpeedReader";
import AnnotationModal from "./containers/AnnotationModal";
import NavigationMenu from "./containers/NavigationMenu";

/* ----- IMPORT UTILITIES ----- */
import { formatBookString } from "./utils/formatBookString";
import {
  openModal,
  openSingleFromMulti,
  backToMultiModal,
  closeModal,
  updateModal
} from "./utils/annotationModalUtils.js";
import { updateSettings, updatePermissions } from "./utils/settingsUtils";
import {
  addHighlight,
  updateHighlight,
  deleteHighlight,
  updateAnnotation,
  deleteAnnotation,
  newHighlightOpenModal
} from "./utils/highlightsUtils";
import {
  toggleAudioMenu,
  openAudioMenu,
  closeAudioMenu,
  toggleShowAudioHighlights,
  playAudio,
  pauseAudio,
  setAudioSpeed,
  seekAudio,
  setHighlights
} from "./utils/audioUtils";
import { addHighlightsToBook } from "./utils/addHighlightsToBook";

/* ----- IMPORT USER DATA ----- */
import { UsersDemo } from "./data/users.js";

/* ----- IMPORT STYLES ----- */
import { AppStyles } from "./styles/AppStyles.js";
import "./App.css";

/* ----- BOOK IMPORT (FOGHORN) ----- */
import { FoghornString } from "./data/foghorn/content1Unformatted.js";
import { FoghornHighlights } from "./data/foghorn/highlights.js";
import { FoghornGlossary } from "./data/foghorn/glossary.js";
import FoghornTranscription from "./data/foghorn/transcription.json";
import NamesTranscription from "./data/names/namesNombres.json";

/* ----- BOOK IMPORT (THANK YOU MA'AM IMPORT) ----- */
import { TymString } from "./data/tym/content1Unformatted.js";
import { TymHighlights } from "./data/tym/highlights.js";
import { TymGlossary } from "./data/tym/glossary.js";

/* ----- BOOK IMPORT (THANK YOU MA'AM IMPORT) ----- */
import { NamesString } from "./data/names/content1Unformatted.js";
import { NamesHighlights } from "./data/names/highlights.js";
import { NamesGlossary } from "./data/names/glossary.js";

// import "./styles/default.css";

const defaultBook = "names";
const defaultUser = UsersDemo.user333;

/* --- break book into object --- */
const formattedTym = formatBookString(TymString);
const formattedFoghorn = formatBookString(FoghornString);
const formattedNames = formatBookString(NamesString);

/// select correct transcrption from the data file
//// FoghornTranscription
//// NamesTranscription
const transcription = JSON.parse(JSON.stringify(NamesTranscription));

const styles = AppStyles;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDemoControls: false,
      user: defaultUser,
      book: formattedNames,
      transcription: transcription,
      highlights: NamesHighlights,
      glossary: NamesGlossary,
      speedReader: { wpm: 250, isPlaying: false, position: 0 },
      audio: {
        isPlaying: false,
        isMenuOpen: false,
        showAudioHighlights: true,
        audioHighlightsIds: []
      },
      annotationModal: {
        open: false,
        highlightsIdArray: [],
        multiHighlightIds: [],
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
        darkMode: false,
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
          book: formatBookString(TymString),
          highlights: TymHighlights,
          glossary: TymGlossary
        });
      } else if (bookNameObject.bookName === "foghorn") {
        this.setState({
          book: formatBookString(FoghornString),
          highlights: FoghornHighlights,
          glossary: FoghornGlossary
        });
      } else if (bookNameObject.bookName === "names") {
        this.setState({
          book: formatBookString(NamesString),
          highlights: NamesHighlights,
          glossary: NamesGlossary
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
    update: highlightUpdate => {
      this.setState(prevState => updateHighlight(prevState, highlightUpdate));
    },
    deleteHighlight: highlightId => {
      this.setState(prevState => {
        return {
          annotationModal: {
            highlightsIdArray: [],
            open: false
          }
        };
      }, this.setState(prevState => deleteHighlight(prevState, highlightId)));
    },
    updateAnnotation: annotationObject => {
      this.setState(prevState => updateAnnotation(prevState, annotationObject));
    },
    deleteAnnotation: annotationObject => {
      console.log("delete buddy", annotationObject);
      this.setState(prevState => deleteAnnotation(prevState, annotationObject));
    }
  };

  annotationModalControl = {
    close: () => this.setState(prevState => closeModal(prevState)),
    open: highlightsIdArray => {
      this.setState(prevState => openModal(prevState, highlightsIdArray));
    },
    openFromMulti: highlightsIdArray => {
      this.setState(prevState =>
        openSingleFromMulti(prevState, highlightsIdArray)
      );
    },
    backToMultiModal: highlightsIdArray => {
      this.setState(prevState =>
        backToMultiModal(prevState, highlightsIdArray)
      );
    },
    update: content =>
      this.setState(prevState => updateModal(prevState, content))
  };

  audioControls = {
    toggleAudioMenu: () =>
      this.setState(prevState => toggleAudioMenu(prevState)),
    closeAudioMenu: () => {
      this.setState(prevState => closeAudioMenu(prevState))

      // pause audio
      this.setState(prevState => pauseAudio(prevState))

      // stop reader
      this.setState(prevState => toggleShowAudioHighlights(prevState))

    },
    openAudioMenu: () => this.setState(prevState => openAudioMenu(prevState)),
    toggleShowAudioHighlights: () =>
      this.setState(prevState => toggleShowAudioHighlights(prevState)),
    play: () => this.setState(prevState => playAudio(prevState)),
    pause: () => this.setState(prevState => pauseAudio(prevState)),
    setSpeed: speed =>
      this.setState(prevState => setAudioSpeed(prevState, speed)),
    seekAudio: seconds =>
      this.setState(prevState => seekAudio(prevState, seconds)),
    setHighlights: ids =>
      this.setState(prevState => setHighlights(prevState, ids))
  };

  componentDidMount() {
    this.state.settings.bookName === "tym"
      ? this.setState({
        book: formattedTym,
        highlights: TymHighlights,
        glossary: TymGlossary
      })
      : this.state.settings.bookName === "foghorn"
        ? this.setState({
          book: formattedFoghorn,
          highlights: FoghornHighlights,
          glossary: FoghornGlossary
        })
        : this.setState({
          book: formattedNames,
          highlights: NamesHighlights,
          glossary: NamesGlossary
        });

    // check to see if url contains "demo" and unhide settings option
    if (window.location.href.indexOf("demo") > -1) {
      this.setState({ showDemoControls: true })
    } else this.setState({ showDemoControls: false })
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
            },
            secondary: {
              main: "#eeab46"
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
          multiHighlightIds={this.state.annotationModal.multiHighlightIds}
          highlights={this.state.highlights}
          annotationModalControl={this.annotationModalControl}
          users={UsersDemo}
          userId={this.state.user.userId}
          highlightsControl={this.highlightsControl}
          settings={this.state.settings}
          permissions={this.state.permissions}
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
              showDemoControls={this.state.showDemoControls}

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
              glossary={this.state.glossary}
              audioControls={this.audioControls}
              audio={this.state.audio}
              transcription={this.state.transcription}
            />

            <Highlights
              highlights={this.state.highlights}
              style={Object.assign({}, styles.slide, styles.highlightsSlide)}
              annotationModalControl={this.annotationModalControl}
              users={UsersDemo}
            />
            <SpeedReader
              style={Object.assign({}, styles.slide, styles.speedReaderSlide)}
              book={this.state.book}
              speedReader={this.state.speedReader}
            />
            {/*<AudioContainer
              bookName={this.state.settings.bookName}
              transcription={this.state.transcription}
              style={Object.assign({}, styles.slide, styles.audioSlide)}
            />*/}
          </SwipeableViews>
        </Paper>

        {/*========== BOTTOM NAVIGATION MENU =========*/}
        <NavigationMenu
          changeSlideView={this.changeSlideView}
          view={this.state.slide}
          audioControls={this.audioControls}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
