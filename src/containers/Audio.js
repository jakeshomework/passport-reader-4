import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */

/* ----- EXTERNAL LIBRARY IMPORTS ----- */
import ReactAudioPlayer from "react-audio-player";

/*---undefined---*/

class Audio extends Component {
  audioListener = time => {
    console.log(time);
  };

  render() {
    const { bookName } = this.props;

    const audioFile = `book-${bookName}/audio/${bookName}.mp3`;

    return (
      <div>
        <ReactAudioPlayer
          src={audioFile}
          listenInterval={1000}
          onListen={this.audioListener}
          controls
        />
      </div>
    );
  }
}

Audio.propTypes = {};

export default Audio;
