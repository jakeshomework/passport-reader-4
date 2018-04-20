export const toggleAudioMenu = prevState => {
  let newAudio = {
    ...prevState.audio,
    isMenuOpen: !prevState.audio.isMenuOpen
  };
  return { audio: newAudio };
};

export const closeAudioMenu = prevState => {
  let newAudio = {
    ...prevState.audio,
    isMenuOpen: false
  };
  return { audio: newAudio };
};

export const openAudioMenu = prevState => {
  let newAudio = {
    ...prevState.audio,
    isMenuOpen: true
  };
  return { audio: newAudio };
};

export const toggleShowAudioHighlights = prevState => {
  let newAudio = {
    ...prevState.audio,
    showAudioHighlights: !prevState.audio.showAudioHighlights
  };
  return { audio: newAudio };
};

export const playAudio = prevState => {
  let newAudio = {
    ...prevState.audio,
    isPlaying: true
  };
  return { audio: newAudio };
};

export const pauseAudio = prevState => {
  let newAudio = {
    ...prevState.audio,
    isPlaying: false
  };
  return { audio: newAudio };
};

export const setAudioSpeed = (prevState, speed) => {
  let newAudio = {
    ...prevState.audio,
    speed: speed
  };
  return { audio: newAudio };
};

export const seekAudio = (prevState, seconds) => {
  let newAudio = {
    ...prevState.audio,
    seconds: seconds
  };
  return { audio: newAudio };
};

export const setHighlights = (prevState, ids) => {
  let newAudio = {
    ...prevState.audio,
    audioHighlightsIds: ids
  };
  return { audio: newAudio };
};
