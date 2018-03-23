import React, { Component } from "react";
import { FormControlLabel } from "material-ui/Form";
import { InputLabel } from "material-ui/Input";

import Switch from "material-ui/Switch";
/* ----- COMPONENT IMPORTS ----- */

class SettingsSwitch extends Component {
  render() {
    return (
      <div>
        <InputLabel htmlFor="Select">{this.props.label}</InputLabel>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={this.props.handleChangeSettings}
            />
          }
        />
      </div>
    );
  }
}

export default SettingsSwitch;
