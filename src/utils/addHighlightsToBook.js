import { buildArrayOfDisplayIds } from "./buildArrayOfDisplayIds";

export const addHighlightsToBook = (bookDisplayOriginal, highlights) => {
  // console.log(highlights);
  /* --- build array of highlight keys to iterate over --- */
  const highlightKeys = Object.keys(highlights);

  /* --- make a copy of bookDisplay to modify --- */
  //   let bookDisplayWithHighlights = Object.create(bookDisplay); /* doesn't work */
  let bookDisplayWithHighlights = JSON.parse(
    JSON.stringify(bookDisplayOriginal)
  );

  highlightKeys.forEach(highlightId => {
    let startId = highlights[highlightId].startId;
    let endId = highlights[highlightId].endId;
    // console.log(startId, endId);

    const idArrayToHighlight = buildArrayOfDisplayIds(startId, endId);

    /* --- push highlight id to bookDisplay ids --- */
    idArrayToHighlight.forEach(spanId => {
      if (
        bookDisplayWithHighlights[spanId].type === "text" ||
        bookDisplayWithHighlights[spanId].type === "space"
      ) {
        bookDisplayWithHighlights[spanId].highlights.push(highlightId);
      }
    });
  });
  return bookDisplayWithHighlights;
};
