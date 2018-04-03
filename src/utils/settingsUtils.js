export const updateSettings = (prevState, updateObject) => {
  let newSettings = {
    ...prevState.settings,
    ...updateObject
  };
  // console.table(updateObject);
  return { settings: newSettings };
};

export const updatePermissions = (prevState, updateObject) => {
  let newSettings = {
    ...prevState.permissions,
    ...updateObject
  };
  // console.table(updateObject);
  return { permissions: newSettings };
};
