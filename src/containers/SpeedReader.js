import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SpeedReaderSingle from "../components/SpeedReaderSingle";
import SpeedReaderControls from "../components/SpeedReaderControls";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

const styles = theme => ({});

class SpeedReader extends Component {
  state = {
    wordPosition: 0,
    wpm: 300,
    word: "WORD",
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
    this.togglePlay();

    let wordIds = Object.keys(this.props.book.bookDisplay).filter(id => {
      if (this.props.book.bookDisplay[id].type === "text") {
        return true;
      } else return false;
    });
    let words = wordIds.map((id, i) => {
      return this.props.book.bookDisplay[id].content;
    });

    var wordIndex = 0;
    var sentenceIndex = 0;
    let wordSet = this.state.word;

    let showOneWord = () => {
      this.setState({ word: words[wordIndex] });
      this.setState({ wordPosition: wordIndex });
      wordIndex++;
    };
    console.log("wordIndex", wordIndex);

    setInterval(showOneWord, this.state.wpm);

    // 1. count total words
    // 2. count index
    // 3. load state from each index

    // 4. set speed var

    // 5. regex sentence - period, question mark, exclamation
    // 6. set sentence index in state
  };
  togglePlay = event => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  handleSpeedInput = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  increaseSpeed = event => {
    this.setState({ wpm: this.state.wpm + 100 });
  };
  decreaseSpeed = event => {
    this.setState({ wpm: this.state.wpm - 100 });
  };
  /*---scrub, add, or subtract speed reader position in book.---*/
  changePosition = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={1} sm={4} />
          <Grid item xs={10} sm={4}>
            <SpeedReaderSingle word={this.state.word} />
            <SpeedReaderControls
              wpm={this.state.wpm}
              playing={this.state.isPlaying}
              displayOneWord={this.displayOneWord}
              handleChange={this.handleSpeedInput("wpm")}
              increaseSpeed={this.increaseSpeed}
              decreaseSpeed={this.decreaseSpeed}
            />
          </Grid>
          <Grid item xs={1} sm={4} />
        </Grid>
      </div>
    );
  }
}

SpeedReader.propTypes = {};

export default withStyles(styles)(SpeedReader);
