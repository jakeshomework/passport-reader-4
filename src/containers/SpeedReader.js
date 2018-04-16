import React, { Component } from "react";

/* ----- COMPONENT IMPORTS ----- */
import SpeedReaderSingle from "../components/SpeedReaderSingle";
import SpeedReaderControls from "../components/SpeedReaderControls";

/* ----- UI IMPORTS ----- */
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

const styles = theme => ({});

class SpeedReader extends Component {
  state = {
    wpm: 250,
    wpmOptions: [250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
    word: "",
    splitWordBegin: [],
    splitWordMiddle: [],
    splitWordEnd: [],
    joinedWordBegin: "Click Play to Start",
    joinedWordMiddle: "",
    joinedWordEnd: "",
    isPlaying: false,
    wordIndex: 0,
    sentenceIndex: 0
  };
  handleChange = prop => event => {
    clearInterval(this.state.interval);
    this.setState({ [prop]: event.target.value }, () => {
      if (this.state.isPlaying) {
        this.setState({
          interval: setInterval(this.displayOneWord, 60000 / this.state.wpm)
        });
      }
    });
  };

  displayOneWord = () => {
    let wordIds = Object.keys(this.props.book.bookDisplay).filter(id => {
      if (this.props.book.bookDisplay[id].type === "text") {
        return true;
      } else return false;
    });
    let words = wordIds.map((id, i) => {
      let word = this.props.book.bookDisplay[id].content
        .replace(/&#x2019;/, "'")
        .replace(/&#x201C;/, "“")
        .replace(/&#x201D;/, "”");

      return word;
    });

    this.setState({ wordIndex: this.state.wordIndex + 1 });
    this.setState({ word: words[this.state.wordIndex] });
    this.setState({ wordPosition: this.state.wordIndex });

    let splitWord = this.state.word.split("");

    this.setState({ splitWordBegin: splitWord });

    let splitLength = splitWord.length;

    switch (((splitWord, splitLength), true)) {
      case splitLength < 2:
        splitWord;
        console.log(
          "slice at 0: " + splitWord,
          "sliced letter: ",
          splitWord[0]
        );
        this.setState({ splitWordBegin: [] });
        this.setState({ splitWordMiddle: splitWord.slice() });
        this.setState({ splitWordEnd: [] });
        break;
      case splitLength < 5:
        splitWord;
        console.log(
          "slice at 1: " + splitWord,
          "sliced letter: ",
          splitWord[1]
        );
        this.setState({ splitWordBegin: splitWord.slice(0, 1) });
        this.setState({ splitWordMiddle: splitWord.slice(1, 2) });
        this.setState({ splitWordEnd: splitWord.slice(2) });
        break;
      case splitLength < 9:
        splitWord;
        console.log(
          "slice at 2: " + splitWord,
          "sliced letter: ",
          splitWord[2]
        );
        this.setState({ splitWordBegin: splitWord.slice(0, 2) });
        this.setState({ splitWordMiddle: splitWord.slice(2, 3) });
        this.setState({ splitWordEnd: splitWord.slice(3) });
        break;
      case splitLength < 13:
        splitWord;
        console.log(
          "slice at 3: " + splitWord,
          "sliced letter: ",
          splitWord[3]
        );
        this.setState({ splitWordBegin: splitWord.slice(0, 3) });
        this.setState({ splitWordMiddle: splitWord.slice(3, 4) });
        this.setState({
          splitWordEnd: splitWord.slice(4)
        });
        break;
      case splitLength < 18:
        splitWord;
        console.log(
          "slice at 4: " + splitWord,
          "sliced letter: ",
          splitWord[4]
        );
        this.setState({ splitWordBegin: splitWord.slice(0, 4) });
        this.setState({ splitWordMiddle: splitWord.slice(4, 5) });
        this.setState({ splitWordEnd: splitWord.slice(5) });
        break;
    }

    this.setState({
      joinedWordBegin: this.state.splitWordBegin.join(""),
      joinedWordMiddle: this.state.splitWordMiddle.join(""),
      joinedWordEnd: this.state.splitWordEnd.join("")
    });
    // 1. count total words
    // 2. count index
    // 3. load state from each index
    // 4. set speed var
    // 5. regex sentence - period, question mark, exclamation
    // 6. set sentence index in state
  };

  stopWords = interval => {
    this.setState({ isPlaying: false });
    clearInterval(this.state.interval);
  };
  startWords = () => {
    this.setState({
      interval: setInterval(this.displayOneWord, 60000 / this.state.wpm)
    });
    this.setState({ isPlaying: true });
  };
  fastForward = () => {};
  fastRewind = () => {};

  /*---scrub, add, or subtract speed reader position in book.---*/
  // changePosition = () => {}

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={1} sm={4} />
          <Grid item xs={10} sm={4}>
            <SpeedReaderSingle
              wordBegin={this.state.joinedWordBegin}
              wordMiddle={this.state.joinedWordMiddle}
              wordEnd={this.state.joinedWordEnd}
            />
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

export default withStyles(styles)(SpeedReader);
