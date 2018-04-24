import React, { Component } from "react";
import { FormControlLabel } from "material-ui/Form";
import Switch from "material-ui/Switch";
import { withStyles } from "material-ui/styles";
/* ----- COMPONENT IMPORTS ----- */
const styles = theme => ({
  root: {
    fontSize: theme.typography.fontSize,
    marginLeft: 10
  }
});
class AudioSwitch extends Component {
  render() {
    const { classes, handleChangeSettings, setting } = this.props;
    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={handleChangeSettings}
              checked={setting}
            />
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(AudioSwitch);
