import React, { Component } from "react";
/* ----- IMPORT CONTAINERS ----- */
import Settings from "./containers/Settings";
import Book from "./containers/Book";
import Highlights from "./containers/Highlights";
import Audio from "./containers/Audio";
import SpeedReader from "./containers/SpeedReader";
import AnnotationModal from "./containers/AnnotationModal";
import { formatBookString } from "./utils/formatBookString";
import SwipeableViews from "react-swipeable-views";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

/* ----- FOGHORN IMPORT ----- */
// import { BookOriginal } from "./data/foghorn/content1.js";
import { BookString } from "./data/foghorn/content1Unformatted.js";
import { HighlightsDemo } from "./data/highlights.js";
console.log(HighlightsDemo);
/* ----- THANK YOU MA'AM IMPORT ----- */
// import { BookOriginal } from "./data/tym/content1.js";
// import { BookOriginal } from "./data/tym/content1Unformatted.js";

console.log(formatBookString(BookString));

let formattedBook = formatBookString(BookString);

const handleChangeIndex = () => {};

const styles = {
  slideContainer: {
    height: "100vh",
    WebkitOverflowScrolling: "touch" // iOS momentum scrolling
  },
  slide: {
    padding: 15,
    minHeight: 100,
    //color: "#fff",
    marginTop: "48px",
    maxWidth: "960px",
    width: "100%",
    margin: "auto"
    // backgroundColor: "red"
    // background: theme.palette.background.paper
  },

  slide3: {
    backgroundColor: "#6AC0FF",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      book: {
        bookDisplay: formattedBook.bookDisplay,
        asides: formattedBook.asides,
        images: formattedBook.images,
        links: formattedBook.links
      },
      highlights: HighlightsDemo,
      annotationModal: {
        open: false,
        highlightId: "",
        content: {}
      },
      settings: {
        view: "Class || Individual ",
        focusMode: false,
        showHelpTips: false,
        darkMode: false,
        fontSize: "14",
        fontFamily: "Helvetica"
      },
      slide: 0
    };
  }

  render() {
    let fontFamily = this.state.settings.fontFamily;
    let fontSize = this.state.settings.fontSize;

    return (
      <MuiThemeProvider>
        <Settings />
        <AnnotationModal />
        <SwipeableViews
          index={this.state.slide}
          onChangeIndex={handleChangeIndex}
          containerStyle={styles.slideContainer}
          style={{
            /*this.state.settings.darkMode ? (
              { backgroundColor: red[800] }
            ) : (
              { backgroundColor: "white" }
            )*/
          }}
        >
          <Book book={this.state.book} />
          <Highlights />
          <Audio />
          <SpeedReader />
        </SwipeableViews>
      </MuiThemeProvider>
    );
  }
}

export default App;
