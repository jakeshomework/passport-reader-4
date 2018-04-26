export const closeModal = prevState => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: false
    }
  };
};

export const openModal = (prevState, highlightsIdArray) => {
  // console.log("highlightsIdArray", highlightsIdArray);
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: true,
      highlightsIdArray: highlightsIdArray
    }
  };
};

export const openSingleFromMulti = (prevState, highlightsIdArray) => {
  // console.log("highlightsIdArray", highlightsIdArray);
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: true,
      highlightsIdArray: highlightsIdArray,
      multiHighlightIds: prevState.annotationModal.highlightsIdArray
    }
  };
};

export const backToMultiModal = (prevState, highlightsIdArray) => {
  // console.log("highlightsIdArray", highlightsIdArray);
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: true,
      highlightsIdArray: highlightsIdArray,
      multiHighlightIds: []
    }
  };
};

export const updateModal = (prevState, content) => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      content
    }
  };
};
