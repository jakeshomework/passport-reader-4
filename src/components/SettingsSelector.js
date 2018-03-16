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
      fontSelect: "14"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    this.setState({ fontSelect: event.target.value });
    console.log("event target value", event.target.value);
    this.props.handleChangeSettings({ selectedFont: event.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { label } = this.props;
    return (
      <div className="classes.formControl">
        <InputLabel htmlFor="fontSelect">{label}</InputLabel>
        <Select
          open={this.state.open}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={this.state.fontSelect}
          onChange={this.handleChange}
        >
          <MenuItem value={this.props.fontSize[0]}>
            {this.props.fontSize[0]}
          </MenuItem>
          <MenuItem value={this.props.fontSize[1]}>
            {this.props.fontSize[1]}
          </MenuItem>
          <MenuItem value={this.props.fontSize[2]}>
            {this.props.fontSize[2]}
          </MenuItem>
          {/* {this.props.fontSize.map((fontsize, index) => (
            <MenuItem key={index} value={fontsize.value}>
              {fontsize.display}
            </MenuItem>
          ))} */}
        </Select>
      </div>
    );
  }
}

SettingsSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsSelector);
