import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControlLabel } from "material-ui/Form";
import { InputLabel } from "material-ui/Input";
import Grid from "material-ui/Grid";
import Switch from "material-ui/Switch";
import { withStyles } from "material-ui/styles";
/* ----- COMPONENT IMPORTS ----- */
const styles = theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    width: "100%"
  }
});
class SettingsSwitch extends Component {
  render() {
    const { classes, disabled } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <Grid item sm={6}>
            <InputLabel htmlFor="Select">{this.props.label}</InputLabel>
          </Grid>
          <Grid item sm={6} className={classes.formLabel}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  onChange={this.props.handleChangeSettings}
                  disabled={disabled}
                />
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
SettingsSwitch.propTypes = {
  classes: PropTypes.object,
  darkMode: PropTypes.bool,
  handleChangeSettings: PropTypes.func
};

export default withStyles(styles)(SettingsSwitch);
