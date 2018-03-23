export const closeModal = prevState => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: false
    }
  };
};

export const openModal = (prevState, highlightsIdArray) => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: true,
      highlightsIdArray: highlightsIdArray
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
