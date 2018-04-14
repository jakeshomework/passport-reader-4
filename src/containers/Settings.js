import React, { Component } from "react";

/* ----- CUSTOM COMPONENTS  ----- */
import SettingsSelector from "../components/SettingsSelector";
import SettingsSwitch from "../components/SettingsSwitch";

/* ----- MATERIAL-UI COMPONENTS ----- */
import { withStyles } from "material-ui/styles";

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
import FontDownload from "material-ui-icons/FontDownload";
import TextFields from "material-ui-icons/TextFields";
import People from "material-ui-icons/People";
import GroupIcon from "material-ui-icons/GroupWork";
import BookIcon from "material-ui-icons/Book";
import PersonIcon from "material-ui-icons/Person";
import Typography from "material-ui/Typography";

/*---In a side drawer, Settings contains the user control over the content.---*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
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
    this.props.settingsControl.changePermissions({
      allowClassView: !this.props.permissions.allowClassView
    });
  };
  /* --- Allow students to leave comments on other students' highlights --- */
  toggleSocialAnnotations = () => {
    this.props.settingsControl.changePermissions({
      allowSocialAnnotations: !this.props.permissions.allowSocialAnnotations
    });
  };

  /*---Only show if correct permissions are met -- teacher or teacher authorized class view.---*/
  toggleClassView = () => {
    this.props.settingsControl.update({
      classView: !this.props.settings.classView
    });
  };
  /*---Hide all highlights to allow for a clean reading experience. *User can still add highlights.---*/
  toggleFocusMode = () => {
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

  changeBook = value => {
    this.props.settingsControl.changeBook({ bookName: value });
  };

  changeUser = user => {
    this.props.settingsControl.changeUser(user);
  };

  /*---Available for teachers only, this allows students to use the toggleView method.---*/
  toggleViewPermissions = () => {};

  render() {
    const {
      classView,
      focusMode,
      darkMode,
      fontFamily,
      fontSize,
      bookName
    } = this.props.settings;

    const { allowClassView } = this.props.permissions;

    const { classes, user } = this.props;

    const bookOptions = ["tym", "foghorn"];
    const userOptions = ["user111", "user222", "user333"];

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs sm={2} />
          <Grid item xs sm={8}>
            <List subheader={<ListSubheader>Demo Controls</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Change Book
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSelector
                    options={bookOptions}
                    handleChangeSettings={this.changeBook}
                    currentSelection={bookName}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Change User
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSelector
                    options={userOptions}
                    handleChangeSettings={this.changeUser}
                    currentSelection={user.userId}
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
                <ListItem>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={classes.ListItemText}>
                        Allow Social Annotations
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <SettingsSwitch
                      setting={classView}
                      handleChangeSettings={this.toggleSocialAnnotations}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            ) : null}

            <List
              subheader={<ListSubheader>Reading Modes</ListSubheader>}
              className={classes.list}
            >
              <ListItem>
                <ListItemIcon>
                  <CenterFocusStrong />
                </ListItemIcon>
                <ListItemText
                  styles={styles.listitemFontSize}
                  primary={
                    <Typography className={classes.ListItemText}>
                      Focus Mode
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    setting={focusMode}
                    handleChangeSettings={this.toggleFocusMode}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InvertColors />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.ListItemText}>
                      Dark Mode
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <SettingsSwitch
                    darkMode={darkMode}
                    handleChangeSettings={this.toggleDarkMode}
                  />
                </ListItemSecondaryAction>
              </ListItem>
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
          <Grid item xs sm={2} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
