/* --- build array of bookDisplay ids to highlight (startId: emc-123) --- */
export const buildArrayOfDisplayIds = (startId, endId) => {
  let currentId = startId.slice(4);
  const idArrayToHighlight = [];
  while (currentId <= endId.slice(4)) {
    idArrayToHighlight.push(`emc-${currentId}`);
    currentId++;
  }
  return idArrayToHighlight;
};
