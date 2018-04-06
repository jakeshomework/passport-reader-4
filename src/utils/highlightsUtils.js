import uuidv4 from "uuid/v4";

export const addHighlight = (prevState, highlightObject) => {
  // console.log(highlightObject);
  const highlightId = uuidv4();
  const userId = prevState.user.userId;
  const currentDate = new Date();

  const brandNewHighlight = {
    id: highlightId,
    courseId: "187",
    bookId: "555",
    userId: userId,
    highlightedText: highlightObject.content,
    startId: highlightObject.startId,
    endId: highlightObject.endId,
    color: highlightObject.color,
    createdAt: currentDate,
    updated: currentDate,
    annotations: []
  };

  let newHighlights = {
    ...prevState.highlights,
    [highlightId]: brandNewHighlight
  };

  return { highlights: newHighlights };
};

export const newHighlightOpenModal = (prevHighlights, newHighlights) => {
  let prevIds = Object.keys(prevHighlights);
  let newIds = Object.keys(newHighlights);
  let singleNewHighlightId = newIds.filter(id => prevIds.indexOf(id) === -1);
  return singleNewHighlightId;
};

export const updateHighlight = (prevState, highlightUpdate) => {
  const newHighlights = {
    ...prevState.highlights
  };
  newHighlights[highlightUpdate.id] = { ...highlightUpdate };
  return { highlights: newHighlights };
};

export const deleteHighlight = (prevState, highlightId) => {
  let newHighlights = {
    ...prevState.highlights
  };
  delete newHighlights[highlightId];
  console.log("lalalaa", newHighlights);
  return {
    highlights: newHighlights
  };
};

// export const addAnnotation = (prevState, { highlightId, type }) => {
//   const newAnnotationObject = {
//     userId: prevState.user.userId,
//     type: type,
//     createdAt: new Date(),
//     content: ""
//   };

//   let newHighlights = { ...prevState.highlights };

//   newHighlights[highlightId].annotations.push(newAnnotationObject);

//   console.log(newHighlights);
//   return { highlights: newHighlights };
// };

export const updateAnnotation = (
  prevState,
  { highlightId, annotationIndex, newContent, type }
) => {
  console.log(highlightId, annotationIndex, newContent);
  let newHighlights = { ...prevState.highlights };
  /* --- create new when saving a new annotation --- */
  console.log("newbie", newHighlights);
  if (!newHighlights[highlightId].annotations[annotationIndex]) {
    let newAnnotationObject = {
      userId: prevState.user.userId,
      type: type,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: newContent
    };
    newHighlights[highlightId].annotations.push(newAnnotationObject);
  } else {
    /* --- update an existing annotation --- */
    newHighlights[highlightId].annotations[
      annotationIndex
    ].content = newContent;
  }
  console.log(newHighlights);
  return { highlights: newHighlights };
};

export const deleteAnnotation = (
  prevState,
  { highlightId, annotationIndex }
) => {
  let newHighlights = { ...prevState.highlights };

  newHighlights[highlightId].annotations.splice(annotationIndex, 1);

  return { highlights: newHighlights };
};
