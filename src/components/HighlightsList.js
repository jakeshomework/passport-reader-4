import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import List, { ListItem } from "material-ui/List";
import { FormGroup, FormControlLabel } from "material-ui/Form";

import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import grey from "material-ui/colors/grey";
import Typography from "material-ui/Typography";
import renderHTML from "react-render-html";

import Badge from "material-ui/Badge";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import VideocamIcon from "material-ui-icons/Videocam";

import moment from "moment";

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

// ===== MATERIAL-UI COLOR IMPORTS yellow, blue, green, pink, purple ===== //
import { colorLabels } from "../config/colorLabels";
import { Avatar } from "material-ui";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.white
  },
  body: {
    fontSize: theme.typography.fontSize
  }
}))(TableCell);

/*---Displays a list of Highlights ---*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  table: {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  tableHead: {
    backgroundColor: grey["700"],
    color: "black"
  },
  checkbox: {
    marginRight: "20px"
  },
  allCheckbox: {
    marginRight: "10px",
    marginLeft: "30px",
    color: "white",
    backgroundColor: grey["700"]
  },
  checkBoxes: {
    float: "left",
    paddingBottom: theme.spacing.unit * 4
  },
  badge: {
    marginRight: "20px"
  }
});

function createData(userId, highlightedText, updated, annotations) {
  return { userId, highlightedText, updated, annotations };
}

class HighlightsList extends Component {
  state = {
    hlc1: true,
    hlc2: true,
    hlc3: true,
    hlc4: true,
    hlc5: true,
    selectAll: false
  };

  togglehlc1 = (event, checked) => {
    this.setState({ hlc1: checked });
  };
  togglehlc2 = (event, checked) => {
    this.setState({ hlc2: checked });
  };
  togglehlc3 = (event, checked) => {
    this.setState({ chlc3: checked });
  };
  togglehlc4 = (event, checked) => {
    this.setState({ hlc4: checked });
  };
  togglehlc5 = (event, checked) => {
    this.setState({ hlc5: checked });
  };
  toggleSelectAll = (event, checked) => {
    this.setState({
      selectAll: checked,
      hlc1: checked,
      hlc2: checked,
      hlc3: checked,
      hlc4: checked,
      hlc5: checked
    });
  };

  handleHighlightClick = highlightId => {
    this.props.annotationModalControl.open([highlightId]);
  };

  render() {
    const { classes, filteredList, users } = this.props;
    const { hlc1, hlc2, hlc3, hlc4, hlc5, selectAll } = this.state;

    const filteredListArray = Object.keys(filteredList);

    return (
      <div className={classes.root}>
        <div className={classes.checkBoxes}>
          <Checkbox
            checked={hlc1}
            onChange={this.togglehlc1}
            value="checked"
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc1.active,
              color: "white"
            }}
          />
          <Checkbox
            checked={hlc2}
            onChange={this.togglehlc2}
            value="checked"
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc2.active,
              color: "white"
            }}
          />
          <Checkbox
            checked={hlc3}
            onChange={this.togglehlc3}
            value="checked"
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc3.active,
              color: "white"
            }}
          />
          <Checkbox
            checked={hlc4}
            onChange={this.togglehlc4}
            value="checked"
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc4.active,
              color: "white"
            }}
          />
          <Checkbox
            checked={hlc5}
            onChange={this.togglehlc5}
            value="checked"
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc5.active,
              color: "white"
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={this.toggleSelectAll}
                value="checked"
                className={classes.allCheckbox}
                disableRipple
              />
            }
            label=" Select All"
          />
        </div>
        <div>
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <CustomTableCell>User</CustomTableCell>
                <CustomTableCell>Highlighted Text</CustomTableCell>
                <CustomTableCell>Date</CustomTableCell>
                <CustomTableCell>Annotations</CustomTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredListArray.map(highlightId => {
                const {
                  userId,
                  color,
                  highlightedText,
                  updated,
                  annotations
                } = filteredList[highlightId];

                const user = users[userId];

                const initials =
                  user.firstName.charAt(0) + user.lastName.charAt(0);

                let noteTotal = 0,
                  audioTotal = 0,
                  videoTotal = 0;

                annotations.forEach(annotation => {
                  if (annotation.type === "note") {
                    noteTotal++;
                  }
                  if (annotation.type === "audio") {
                    audioTotal++;
                  }
                  if (annotation.type === "video") {
                    videoTotal++;
                  }
                });

                return this.state[color] ? (
                  <TableRow
                    onClick={() =>
                      this.props.annotationModalControl.open([highlightId])
                    }
                    value={color}
                  >
                    <CustomTableCell>
                      <Avatar
                        style={{ backgroundColor: colorLabels[color].active }}
                      >
                        {initials}
                      </Avatar>
                    </CustomTableCell>

                    <CustomTableCell>
                      <Typography>{renderHTML(highlightedText)}</Typography>
                    </CustomTableCell>
                    <CustomTableCell>
                      {moment(updated).fromNow()}
                    </CustomTableCell>
                    <CustomTableCell>
                      <Badge
                        className={classes.badge}
                        badgeContent={noteTotal}
                        color="default"
                      >
                        <NoteIcon />
                      </Badge>
                      <Badge
                        className={classes.badge}
                        badgeContent={audioTotal}
                        color="default"
                      >
                        <MicIcon />
                      </Badge>
                      <Badge
                        className={classes.badge}
                        badgeContent={videoTotal}
                        color="default"
                      >
                        <VideocamIcon />
                      </Badge>
                    </CustomTableCell>
                  </TableRow>
                ) : null;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

HighlightsList.propTypes = {
  filteredList: PropTypes.array
};

export default withStyles(styles)(HighlightsList);
