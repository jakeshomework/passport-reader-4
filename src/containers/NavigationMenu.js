// @flow weak

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";

import Book from "material-ui-icons/Book";
import Settings from "material-ui-icons/Settings";
import FormatListBulleted from "material-ui-icons/FormatListBulleted";
import Headset from "material-ui-icons/Headset";
import WbIridescent from "material-ui-icons/WbIridescent";

const styles = {
  root: {
    width: "100vw",
    maxWidth: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 500,
    // backgroundColor: grey[300],
    boxShadow:
      "0px -2px 4px -1px rgba(0, 0, 0, 0.1), 0px 2px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12)"
  },
  icon: {
    display: "block"
  }
};

function NavigationMenu(props) {
  const classes = props.classes;
  // const value = props.view;

  /* --- Open audio menu, unless already on slide with menu open --- */
  const handleChange = (event, value) => {
    if (value === 4 && props.view === 1) {
      props.audioControls.toggleAudioMenu();
    } else if (value === 4 && props.view !== 1) {
      props.audioControls.openAudioMenu();
      props.changeSlideView(1);
    } else props.changeSlideView(value);
  };

  return (
    <BottomNavigation
      value={props.view}
      onChange={handleChange}
      className={classes.root}
    >
      {props.accessSettings === true ? <BottomNavigationAction
        label="Settings"
        value={0}
        icon={<Settings className={classes.icon} />}
      /> : null

      }

      <BottomNavigationAction
        label="Book"
        value={1}
        icon={<Book className={classes.icon} />}
      />
      <BottomNavigationAction
        label="Highlights"
        value={2}
        icon={<FormatListBulleted className={classes.icon} />}
      />
      <BottomNavigationAction
        label="Speed Read"
        value={3}
        icon={<WbIridescent className={classes.icon} />}
      />
      <BottomNavigationAction
        label="Audio"
        value={4}
        icon={<Headset className={classes.icon} />}
      />
      {/*<BottomNavigationButton label="Activities" value={3} icon={<Badge className={classes.badge} badgeContent={4} color="accent"><QuestionAnswer className={classes.icon} /></Badge>} />*/}
    </BottomNavigation>
  );
}

NavigationMenu.propTypes = {
  audioControls: PropTypes.object,
  classes: PropTypes.object.isRequired,
  view: PropTypes.number,
  changeSlideView: PropTypes.func
};

export default withStyles(styles)(NavigationMenu);
