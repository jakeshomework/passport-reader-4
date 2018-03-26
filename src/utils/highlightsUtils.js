import uuidv4 from "uuid/v4";

export const addHighlight = (prevState, highlightObject) => {
  // console.log(highlightObject);
  let highlightId = uuidv4();

  const brandNewHighlight = {
    id: highlightId,
    courseId: "187",
    bookId: "555",
    userId: "user12345",
    highlightedText: highlightObject.content,
    startId: highlightObject.startId,
    endId: highlightObject.endId,
    color: "yellow",
    createdAt: "Wed Mar 14 2018 13:23:19 GMT-0500 (CDT)",
    updated: "Wed Mar 15 2018 13:23:19 GMT-0500 (CDT)",
    annotation: {
      notes: {
        createdAt: "Wed Mar 14 2018 13:23:19 GMT-0500 (CDT)",
        content: "This is the note I'm taking :laughing:"
      },
      audio: {
        createdAt: "Wed Mar 14 2018 13:23:19 GMT-0500 (CDT)",
        content: "someplace/highlightId.mp3"
      },
      video: {
        createdAt: "Wed Mar 14 2018 13:23:19 GMT-0500 (CDT)",
        content: "someplace/highlightId.mp4"
      }
    }
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
