export const closeModal = prevState => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: false
    }
  };
};

export const openModal = (prevState, highlightId) => {
  return {
    annotationModal: {
      ...prevState.annotationModal,
      open: true
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
