import React, { Component } from "react";

/* ----- COMPONENT IMPORTS ----- */
import SpeedReaderSingle from "../components/SpeedReaderSingle";
import SpeedReaderControls from "../components/SpeedReaderControls";

/* ----- UI IMPORTS ----- */
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

//TODO:
// 1. set sentence index in state
// 2. skip ahead to sentence
// 3. skip back to sentence

const styles = theme => ({});

class SpeedReader extends Component {
  state = {
    wpm: 250,
    multiplier: 1,
    wpmOptions: [150, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
    word: "start",
    splitWordBegin: [],
    splitWordMiddle: [],
    splitWordEnd: [],
    joinedWordBegin: "",
    joinedWordMiddle: "",
    joinedWordEnd: "",
    isPlaying: false,
    wordIndex: -1,
    totalSentenceEndingIndex: 0,
    currentSentenceEndingIndex: 0
  };
  handleChange = prop => event => {
    clearInterval(this.state.interval);
    this.setState({ [prop]: event.target.value }, this.restartInterval);
  };

  restartInterval = () => {
    if (this.state.isPlaying) {
      this.setState({
        interval: setInterval(
          this.displayOneWord,
          60000 * this.state.multiplier / this.state.wpm
        )
      });
    }
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
      //console.log("word: ", word);
      return word;
    });

    this.setState({ allWords: words });
    this.setState({ wordIndex: this.state.wordIndex + 1 });
    this.setState({ word: words[this.state.wordIndex] });

    if (this.state.word.endsWith("." || ".”" || "?" || "?”" || "!" || "!”")) {
      clearInterval(this.state.interval);
      this.setState({ multiplier: 3 }, this.restartInterval);
    } else if (this.state.multiplier !== 1) {
      clearInterval(this.state.interval);
      this.setState({ multiplier: 1 }, this.restartInterval);
    }
    let splitWord = this.state.word.split("");
    this.setState({ splitWordBegin: splitWord });
    let splitLength = splitWord.length;

    switch (((splitWord, splitLength), true)) {
      case splitLength < 2:
        splitWord;
        this.setState({ splitWordBegin: [] });
        this.setState({ splitWordMiddle: splitWord.slice() });
        this.setState({ splitWordEnd: [] });
        break;
      case splitLength < 6:
        splitWord;
        this.setState({ splitWordBegin: splitWord.slice(0, 1) });
        this.setState({ splitWordMiddle: splitWord.slice(1, 2) });
        this.setState({ splitWordEnd: splitWord.slice(2) });
        break;
      case splitLength < 9:
        splitWord;
        this.setState({ splitWordBegin: splitWord.slice(0, 2) });
        this.setState({ splitWordMiddle: splitWord.slice(2, 3) });
        this.setState({ splitWordEnd: splitWord.slice(3) });
        break;
      case splitLength < 13:
        splitWord;
        this.setState({ splitWordBegin: splitWord.slice(0, 3) });
        this.setState({ splitWordMiddle: splitWord.slice(3, 4) });
        this.setState({
          splitWordEnd: splitWord.slice(4)
        });
        break;
      case splitLength < 18:
        splitWord;
        this.setState({ splitWordBegin: splitWord.slice(0, 4) });
        this.setState({ splitWordMiddle: splitWord.slice(4, 5) });
        this.setState({ splitWordEnd: splitWord.slice(5) });
        break;
      case splitLength < 30:
        splitWord;
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
  };

  stopWords = () => {
    this.setState({ isPlaying: false });
    clearInterval(this.state.interval);
  };
  startWords = () => {
    this.setState({
      interval: setInterval(
        this.displayOneWord,
        60000 * this.state.multiplier / this.state.wpm
      )
    });
    this.setState({ isPlaying: true });
  };
  resetWords = () => {
    this.setState(
      {
        wordIndex: -1,
        joinedWordBegin: "",
        joinedWordMiddle: "Start",
        joinedWordEnd: "",
        isPlaying: false
      },
      clearInterval(this.state.interval)
    );
  };
  skipPrevious = () => {
    let sentenceEnd = "." || ".”" || "?" || "?”" || "!" || "!”";
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

    let wordIndex = this.state.wordIndex;
    let prevDifference = 1;
    while (!words[wordIndex - prevDifference].endsWith(sentenceEnd)) {
      prevDifference++;
    }
    this.setState(
      {
        wordIndex: this.state.wordIndex - prevDifference,
        isPlaying: false,
        word: words[wordIndex - prevDifference + 1]
      },
      clearInterval(this.state.interval)
    );
  };
  skipNext = () => {
    let sentenceEnd = "." || ".”" || "?" || "?”" || "!" || "!”";
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

    let wordIndex = this.state.wordIndex;
    let difference = 1;
    while (!words[wordIndex + difference].endsWith(sentenceEnd)) {
      difference++;
    }
    this.setState(
      {
        word: words[wordIndex + difference],
        joinedWordBegin: this.state.joinedWordBegin,
        joinedWordMiddle: this.state.joinedWordMiddle,
        joinedWordEnd: this.state.joinedWordEnd,
        wordIndex: this.state.wordIndex + difference,
        isPlaying: false
      },
      this.displayOneWord()
    );
    clearInterval(this.state.interval);

    console.log(words[wordIndex + difference]);
  };

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
              resetWords={this.resetWords}
              skipPrevious={this.skipPrevious}
              play={this.startWords}
              skipNext={this.skipNext}
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
