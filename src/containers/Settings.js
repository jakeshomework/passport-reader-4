import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import SettingsSelector from "../components/SettingsSelector";
import SettingsSwitch from "../components/SettingsSwitch";
/* ----- GRAPHQL IMPORTS ----- */
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_USER from "../graphql/GET_USER";
//import UPDATE_SETTINGS from "../graphql/UPDATE_SETTINGS";

/*---In a side drawer, Settings contains the user control over the content.---*/

class Settings extends Component {
  /*---Only show if correct permissions are met -- teacher or teacher authorized class view.---*/
  toggleView = () => {
    this.props.settingsControl.update({
      classView: !this.props.settings.classView
    });
  };
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  togglefocusMode = () => {
    this.props.settingsControl.update({
      focusMode: !this.props.settings.focusMode
    });
  };
  toggleHelpTips = () => {
    this.props.settingsControl.update({
      showHelpTips: !this.props.settings.showHelpTips
    });
  };
  /*---Create and 'easy-on-eyes' reading experience---*/
  toggleDarkMode = () => {
    this.props.settingsControl.update({
      darkMode: !this.props.settings.darkMode
    });
  };
  changeFontSize = value => {
    this.props.settingsControl.update({
      selectedFontSize: value
    });
  };

  changeFontFamily = value => {
    this.props.settingsControl.update({
      selectedFontFamily: value
    });
  };

  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  render() {
    const {
      classView,
      focusMode,
      showHelpTips,
      darkMode,
      fontFamily,
      fontSize
    } = this.props.settings;

    return (
      <div>
        <SettingsSwitch
          setting={classView}
          handleChangeSettings={this.toggleView}
          label="Class View"
        />
        <SettingsSwitch
          setting={focusMode}
          handleChangeSettings={this.togglefocusMode}
          label="Focus Mode"
        />
        <SettingsSwitch
          setting={showHelpTips}
          handleChangeSettings={this.toggleHelpTips}
          label="Show Help Tips"
        />
        <SettingsSwitch
          darkMode={darkMode}
          handleChangeSettings={this.toggleDarkMode}
          label="Dark Mode"
        />

        <SettingsSelector
          options={fontSize}
          handleChangeSettings={this.changeFontSize}
          label="Font Size"
        />
        <SettingsSelector
          options={fontFamily}
          handleChangeSettings={this.changeFontFamily}
          label="Font Family"
        />
      </div>
    );
  }
}
Settings.propTypes = {};

export default Settings;
