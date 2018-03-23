export const updateSettings = (prevState, updateObject) => {
  let newSettings = {
    ...prevState.settings,
    ...updateObject
  };
  console.table(updateObject);
  return { settings: newSettings };
};
