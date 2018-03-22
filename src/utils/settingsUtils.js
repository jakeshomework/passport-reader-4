export const updateSettings = (prevState, updateObject) => {
  let newSettings = {
    ...prevState.settings,
    ...updateObject
  };
  this.setState({ settings: newSettings });
};
