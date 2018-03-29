import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import { withStyles } from "material-ui/styles";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";

// ===== MATERIAL-UI COLOR IMPORTS yellow, blue, green, pink, purple ===== //
import { colorLabels } from "../config/colorLabels";

/* ----- COMPONENT IMPORTS ----- */
/* ----- GRAPHQL IMPORTS ----- */
//import OPEN_ANNOTAION_MODAL from "../graphql/OPEN_ANNOTAION_MODAL";

/*---Displays a single highlights---*/

class Highlight extends Component {
  /*---Handles click on highlight - triggers OPEN_ANNOTAION_MODAL with highlightId.---*/
  openAnnotaionModal = () => {
    console.log("opened");
  };

  render() {
    console.log("highlight", this.props);
    return (
      <ListItem onClick={this.openAnnotaionModal}>
        <Avatar>
          <ModeEditIcon />
        </Avatar>
        <ListItemText primary={`Highlight`} />
      </ListItem>
    );
  }
}

Highlight.propTypes = {
  highlight: PropTypes.object
};

export default Highlight;
