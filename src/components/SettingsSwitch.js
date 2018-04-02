import React, { Component } from "react";
import { FormControlLabel } from "material-ui/Form";
import { InputLabel } from "material-ui/Input";
import Grid from "material-ui/Grid";
import Switch from "material-ui/Switch";
import { withStyles } from "material-ui/styles";
/* ----- COMPONENT IMPORTS ----- */
const styles = theme => ({
  root: {
    flexGrow: 1,
    fontSize: theme.typography.fontSize
  }
});
class SettingsSwitch extends Component {
  render() {
    const { classes, theme, disabled } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={12}>
          <Grid item xs={6}>
            <InputLabel htmlFor="Select">{this.props.label}</InputLabel>
          </Grid>
          <Grid item xs={6}>
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

export default withStyles(styles)(SettingsSwitch);
