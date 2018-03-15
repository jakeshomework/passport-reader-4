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
  toggleView = () => {};
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  togglefocusMode = () => {};
  /*---Create and 'easy-on-eyes' reading experience---*/
  toggleDarkMode = () => {};
  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <SettingsSwitch />
        <SettingsSwitch />
        <SettingsSwitch />
        <SettingsSelector
          fontSize={this.props.settings.fontSize}
          handleChange={handleChange}
          label="Font Size"
        />
      </div>
    );
  }
}
Settings.propTypes = {};

export default Settings;
