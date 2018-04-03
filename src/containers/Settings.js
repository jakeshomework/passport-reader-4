import React, { Component } from "react";

/* ----- CUSTOM COMPONENTS  ----- */
import SettingsSelector from "../components/SettingsSelector";
import SettingsSwitch from "../components/SettingsSwitch";

/* ----- MATERIAL-UI COMPONENTS ----- */
import { withStyles } from "material-ui/styles";
import { FormControl, FormLabel } from "material-ui/Form";
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "material-ui/List";
import Grid from "material-ui/Grid";

/*===== MATERIAL-UI ICONS =====*/
import CenterFocusStrong from "material-ui-icons/CenterFocusStrong";
import InvertColors from "material-ui-icons/InvertColors";
import HelpOutline from "material-ui-icons/HelpOutline";
import FontDownload from "material-ui-icons/FontDownload";
import TextFields from "material-ui-icons/TextFields";
import People from "material-ui-icons/People";
import Typography from "material-ui/Typography";

/* ----- GRAPHQL IMPORTS ----- */
//import GET_SETTINGS from "../graphql/GET_SETTINGS";
//import GET_USER from "../graphql/GET_USER";
//import UPDATE_SETTINGS from "../graphql/UPDATE_SETTINGS";

/*---In a side drawer, Settings contains the user control over the content.---*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    marginBottom: 100
  },
  list: {
    borderBottom: "1px solid #ccc"
  },
  ListItemText: {
    fontSize: theme.typography.fontSize - 2
  },
  listitemFontSize: {
    fontSize: theme.typography.fontSize
  }
});

class Settings extends Component {
  /* --- AllowClassView only available for teachers --- */
  toggleAllowClassView = () => {
    this.props.settingsControl.update({
      allowClassView: !this.props.settings.allowClassView
    });
  };
  /*---Only show if correct permissions are met -- teacher or teacher authorized class view.---*/
  toggleClassView = () => {
    this.props.settingsControl.update({
      classView: !this.props.settings.classView
    });
  };
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  togglefocusMode = () => {
    this.props.settingsControl.update({
      focusMode: !this.props.settings.focusMode
    });
  };
  toggleHelpTips = () => {
    this.props.settingsControl.update({
      showHelpTips: !this.props.settings.showHelpTips
    });
  };
  /*---Create and 'easy-on-eyes' reading experience---*/
  toggleDarkMode = () => {
    this.props.settingsControl.update({
      darkMode: !this.props.settings.darkMode
    });
  };
  changeFontSize = value => {
    this.props.settingsControl.update({
      selectedFontSize: value
    });
  };
  changeFontFamily = value => {
    this.props.settingsControl.update({
      selectedFontFamily: value
    });
  };
  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  render() {
    const {
      allowClassView,
      classView,
      focusMode,
      showHelpTips,
      darkMode,
      fontFamily,
      fontSize
    } = this.props.settings;
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={1} sm={2} />
          <Grid item xs={10} sm={8}>
            <List
              subheader={<ListSubheader>Reading Modes</ListSubheader>}
              className={classes.list}
            >
              <ListItem>
                <ListItemIcon>
                  <CenterFocusStrong />
                </ListItemIcon>
                <Typography className={classes.fontStyle}>
                  <ListItemText
                    styles={styles.listitemFontSize}
                    primary={
                      <Typography className={classes.ListItemText}>
                        Focus Mode
                      </Typography>
                    }
                  />
                </Typography>
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    setting={focusMode}
                    handleChangeSettings={this.togglefocusMode}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InvertColors />
                </ListItemIcon>
                <Typography className={classes.fontStyle}>
                  <ListItemText
                    primary={
                      <Typography className={classes.ListItemText}>
                        Dark Mode
                      </Typography>
                    }
                  />
                </Typography>
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    darkMode={darkMode}
                    handleChangeSettings={this.toggleDarkMode}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>

            {/* --- Only visible if user role is 'teacher' --- */}
            {this.props.user.role === "teacher" ? (
              <List
                subheader={<ListSubheader>Teacher Settings</ListSubheader>}
                className={classes.list}
              >
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={classes.ListItemText}>
                        Allow Class View
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <SettingsSwitch
                      setting={classView}
                      handleChangeSettings={this.toggleAllowClassView}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ) : null}

            <List
              subheader={<ListSubheader>Visual Settings</ListSubheader>}
              className={classes.list}
            >
              <ListItem>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Class View
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    setting={classView}
                    handleChangeSettings={this.toggleClassView}
                    disabled={!allowClassView}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HelpOutline />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Show Help Tips
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    setting={showHelpTips}
                    handleChangeSettings={this.toggleHelpTips}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <List subheader={<ListSubheader>Font Settings</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <TextFields />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Font Size
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSelector
                    options={fontSize}
                    handleChangeSettings={this.changeFontSize}
                    currentSelection={this.props.settings.selectedFontSize}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FontDownload />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Font Family
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSelector
                    options={fontFamily}
                    handleChangeSettings={this.changeFontFamily}
                    currentSelection={this.props.settings.selectedFontFamily}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={1} sm={2} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
