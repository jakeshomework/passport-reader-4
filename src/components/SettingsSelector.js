import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import Select from "material-ui/Select";
/* ----- COMPONENT IMPORTS ----- */

const styles = theme => ({
  selectField: {
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
      select: ""
    };
  }
  handleChange = event => {
    this.setState({ select: event.target.value });
    this.props.handleChangeSettings(event.target.value);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { label, options } = this.props;
    return (
      <div className="classes.selectField">
        <InputLabel htmlFor="Select">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.select}
          onChange={this.handleChange}
        >
          {/* <MenuItem value={option[0]}>{option[0]}</MenuItem>
          <MenuItem value={option[1]}>{option[1]}</MenuItem>
          <MenuItem value={option[2]}>{option[2]}</MenuItem> */}
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

SettingsSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsSelector);
