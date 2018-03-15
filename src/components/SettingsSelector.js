import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
/* ----- COMPONENT IMPORTS ----- */

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});
/*---Style---*/

class SettingsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      settingsSelectValue: ""
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    console.log("handle change this", this);
    this.setState({ settingsSelectValue: event.target.value });

    // this.props.handleChange({
    //   value: event.target.value
    // });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { label, fontSize } = this.props;
    console.log(this.props.fontSize);
    return (
      <div className="classes.formControl">
        <InputLabel htmlFor="settingsSelectValue">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.settingsSelectValue}
          onChange={this.handleChange}
          input={<Input name="settingsSelectValue" />}
        >
          {/* {fontSize.map((fontSize, i) => (
            <MenuItem key={i} value={fontSize.value}>
              {fontSize.display}
            </MenuItem>
          ))} */}
          <MenuItem value={this.props.fontSize[0]}>
            {this.props.fontSize[0]}
          </MenuItem>
          <MenuItem value={this.props.fontSize[1]}>
            {this.props.fontSize[1]}
          </MenuItem>
          <MenuItem value={this.props.fontSize[2]}>
            {this.props.fontSize[2]}
          </MenuItem>
        </Select>
      </div>
    );
  }
}

SettingsSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsSelector);
