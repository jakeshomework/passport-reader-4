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

  // console.log(newHighlights);

  return { highlights: newHighlights };
};

export const updateHighlight = (prevState, highlightUpdate) => {
  const newHighlights = {
    ...prevState.highlights,
    ...highlightUpdate
  };
  return { highlights: newHighlights };
};

export const deleteHighlight = (prevState, highlightId) => {
  let newHighlights = {
    ...prevState.highlights
  };
  delete newHighlights.highlightId;
  return { highlights: newHighlights };
};

export const addAnnotation = (prevState, { highlightId, type }) => {
  const newAnnotationObject = {
    userId: prevState.user.userId,
    type: type,
    createdAt: new Date(),
    content: ""
  };

  let newHighlights = { ...prevState.highlights };

  newHighlights[highlightId].annotations.push(newAnnotationObject);

  console.log(newHighlights);
  return { highlights: newHighlights };
};

export const updateAnnotation = (
  prevState,
  { highlightId, annotationIndex, newContent }
) => {
  console.log(highlightId, annotationIndex, newContent);
  let newHighlights = { ...prevState.highlights };
  newHighlights[highlightId].annotations[annotationIndex].content = newContent;
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
