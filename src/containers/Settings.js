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
    this.props.changeSettings({
      classView: !this.props.settings.classView
    });
  };
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  togglefocusMode = () => {
    this.props.changeSettings({
      focusMode: !this.props.settings.focusMode
    });
  };
  toggleHelpTips = () => {
    this.props.changeSettings({
      showHelpTips: !this.props.settings.showHelpTips
    });
  };
  /*---Create and 'easy-on-eyes' reading experience---*/
  toggleDarkMode = () => {
    this.props.changeSettings({
      darkMode: !this.props.settings.darkMode
    });
  };

  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  handleSwitch = (event, checked) => {
    // this.props.handleChangeSettings({ switched: checked });
  };

  render() {
    console.log(this.props.settings ? true : false);
    console.log("this.props.settings: ", this.props.settings);
    const {
      classView,
      focusMode,
      showHelpTips,
      darkMode,
      fontFamily,
      fontSize
    } = this.props.settings;

    const { changeSettings } = this.props;

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
          fontSize={fontSize}
          handleChangeSettings={changeSettings}
          label="Font Size"
        />
      </div>
    );
  }
}
Settings.propTypes = {};

export default Settings;
