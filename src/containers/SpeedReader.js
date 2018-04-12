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
    wpm: 250,
    wpmOptions: [250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
    word: "WORD",
    interval: 25,
    isPlaying: false,
    wordIndex: 14,
    sentenceIndex: 0
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  displayOneWord = () => {
    let wordIds = Object.keys(this.props.book.bookDisplay).filter(id => {
      if (this.props.book.bookDisplay[id].type === "text") {
        return true;
      } else return false;
    });
    let words = wordIds.map((id, i) => {
      return this.props.book.bookDisplay[id].content;
    });
    this.setState({ wordIndex: this.state.wordIndex + 1 });
    this.setState({ word: words[this.state.wordIndex] });
    this.setState({ wordPosition: this.state.wordIndex });

    // 1. count total words
    // 2. count index
    // 3. load state from each index
    // 4. set speed var
    // 5. regex sentence - period, question mark, exclamation
    // 6. set sentence index in state
  };

  stopWords = interval => {
    clearInterval(interval);
    this.setState({ isPlaying: false });
  };
  startWords = () => {
    let interval = setInterval(this.displayOneWord, 60000 / this.state.wpm);
    this.setState({ isPlaying: true });
  };
  fastForward = () => {};
  fastRewind = () => {};

  /*---scrub, add, or subtract speed reader position in book.---*/
  // changePosition = () => {};

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
              wpmOptions={this.state.wpmOptions}
              playing={this.state.isPlaying}
              play={this.startWords}
              fastRewind={this.fastRewind}
              fastForward={this.fastForward}
              changeWpm={this.handleChange("wpm")}
              pause={this.stopWords}
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
