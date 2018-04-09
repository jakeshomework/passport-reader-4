import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SpeedReaderSingle from "../components/SpeedReaderSingle";
import SpeedReaderControls from "../components/SpeedReaderControls";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_BOOK from "../graphql/GET_BOOK";
//import GET_SETTINGS from "../graphql/GET_SETTINGS";

/*---undefined---*/

class SpeedReader extends Component {
  state = {
    position: 0,
    speed: 250,
    word: "temp speed content",
    interval: 25,
    isPlaying: false
  };

  /*------*/
  adjustWPM = () => {};
  /*------*/
  pauseSpeed = () => {};
  /*------*/
  goBackRequest = () => {};

  displayOneWord = () => {
    const words = this.props.book.bookDisplay;

    console.log("words", words);
  };

  render() {
    const {} = this.props;
    return (
      <div>
        SpeedReader
        <Grid container spacing={24}>
          <Grid item xs={2} sm={4} />
          <Grid item xs={10} sm={4}>
            <Paper>
              <SpeedReaderSingle word={this.state.word} />
              <SpeedReaderControls display="array" />
            </Paper>
          </Grid>
          <Grid item xs={1} sm={4} />
        </Grid>
      </div>
    );
  }
}

SpeedReader.propTypes = {};

export default SpeedReader;
