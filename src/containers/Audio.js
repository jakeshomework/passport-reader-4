import React, { Component } from "react";
import PropTypes from "prop-types";
import { buildArrayOfDisplayIds } from "../utils/buildArrayOfDisplayIds";
/* ----- MATERIAL-UI IMPORTS ----- */
import Typography from "material-ui/Typography";

/* ----- COMPONENT IMPORTS ----- */

/* ----- EXTERNAL LIBRARY IMPORTS ----- */
import ReactAudioPlayer from "react-audio-player";

/*---undefined---*/

class Audio extends Component {
  state = {
    idsToHighlight: [],
    textOnScreen: ""
  };

  audioListener = time => {
    console.log(time);
    const transcriptions = this.props.transcription;
    let currentTrans = transcriptions.find(el => {
      return time + 1 > el.startTime && time + 1 < el.endTime;
    });

    console.log(currentTrans);

    if (currentTrans !== undefined) {
      const text = currentTrans.phraseDisplayed;
      const ids = buildArrayOfDisplayIds(
        currentTrans.startId,
        currentTrans.endId
      );
      this.props.audioControls.setHighlights(ids);
      this.setState({ textOnScreen: text, idsToHighlight: ids });
    }
  };

  render() {
    const { bookName, transcription } = this.props;

    const audioFile = `book-${bookName}/audio/${bookName}.mp3`;

    return (
      <div>
        <ReactAudioPlayer
          src={audioFile}
          listenInterval={1000}
          onListen={this.audioListener}
          controls
        />
        <div>
          <Typography>{this.state.textOnScreen}</Typography>
        </div>
        <div>
          {/*<Typography>{this.state.idsToHighlight.join()}</Typography>*/}
        </div>
      </div>
    );
  }
}

Audio.propTypes = {
  children: PropTypes.array,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  preload: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.object
};

export default Audio;
