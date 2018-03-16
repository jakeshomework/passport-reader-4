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
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleChange = this.handleChange.bind(this);
  }
  /*---Only show if correct permissions are met -- teacher or teacher authorized class view.---*/
  toggleView = () => {};
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  togglefocusMode = () => {};
  /*---Create and 'easy-on-eyes' reading experience---*/
  toggleDarkMode = () => {};
  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  render() {
    const {
      classView,
      focusMode,
      showHelpTips,
      darkMode,
      fontSize,
      fontFamily
    } = this.props.settings;
    return (
      <div>
        <SettingsSwitch
          classView={classView}
          handleChangeSettings={this.props.changeSettings}
          label="Class View"
        />
        <SettingsSwitch
          focusMode={focusMode}
          handleChangeSettings={this.props.changeSettings}
          label="Focus Mode"
        />
        <SettingsSwitch
          showHelpTips={showHelpTips}
          handleChangeSettings={this.props.changeSettings}
          label="Show Help Tips"
        />
        <SettingsSwitch
          darkMode={darkMode}
          handleChangeSettings={this.props.changeSettings}
          label="Dark Mode"
        />
        <SettingsSelector
          fontSize={fontSize}
          handleChangeSettings={this.props.changeSettings}
          label="Font Size"
        />
      </div>
    );
  }
}
Settings.propTypes = {};

export default Settings;
