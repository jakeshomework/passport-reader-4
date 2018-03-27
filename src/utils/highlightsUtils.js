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
