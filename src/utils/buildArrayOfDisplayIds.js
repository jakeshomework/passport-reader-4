/* --- build array of bookDisplay ids to highlight (startId: emc-123) --- */
export const buildArrayOfDisplayIds = (startId, endId) => {
  let currentId = parseInt(startId.slice(4), 10);
  const idArrayToHighlight = [];
  while (currentId <= parseInt(endId.slice(4), 10)) {
    idArrayToHighlight.push(`emc-${currentId}`);
    currentId++;
  }
  return idArrayToHighlight;
};
