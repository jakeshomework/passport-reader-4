import React, { Component } from "react";
import { FormGroup, FormControlLabel } from "material-ui/Form";
import Switch from "material-ui/Switch";
/* ----- COMPONENT IMPORTS ----- */

class SettingsSwitch extends Component {
  render() {
    return (
      <FormGroup>
        <FormControlLabel
          label={this.props.label}
          control={<Switch onChange={this.props.handleChangeSettings} />}
        />
      </FormGroup>
    );
  }
}

export default SettingsSwitch;
