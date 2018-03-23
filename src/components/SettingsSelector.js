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
    minWidth: 320
  }
});
/*---Style---*/

class SettingsSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      select: this.props.currentSelection
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
          className="classes.select"
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.select}
          onChange={this.handleChange}
        >
          {options.map((option, index) => (
            <MenuItem className="classes.selection" key={index} value={option}>
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
