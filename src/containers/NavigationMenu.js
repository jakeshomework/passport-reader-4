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
import QuestionAnswer from "material-ui-icons/QuestionAnswer";

console.log(withStyles);

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

  const handleChange = (event, value) => {
    props.changeSlideView(value);
  };

  return (
    <BottomNavigation
      value={props.view}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Settings"
        value={0}
        icon={<Settings className={classes.icon} />}
      />
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
        label="Activities"
        value={3}
        icon={<QuestionAnswer className={classes.icon} />}
      />
      {/*<BottomNavigationButton label="Activities" value={3} icon={<Badge className={classes.badge} badgeContent={4} color="accent"><QuestionAnswer className={classes.icon} /></Badge>} />*/}
    </BottomNavigation>
  );
}

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  view: PropTypes.number,
  changeSlideView: PropTypes.func
};

export default withStyles(styles)(NavigationMenu);
