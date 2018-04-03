import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import List, { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import grey from "material-ui/colors/grey";

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
    marginLeft: "10px",
    color: "white",
    backgroundColor: grey["700"]
  },
  checkBoxes: {
    float: "left",
    paddingBottom: theme.spacing.unit * 4
  }
});

function createData(userId, highlightedText, updated, annotations) {
  return { userId, highlightedText, updated, annotations };
}

class HighlightsList extends Component {
  state = {
    checked: true
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleHighlightClick = highlightId => {
    this.props.annotationModalControl.open([highlightId]);
  };

  render() {
    const { classes, filteredList } = this.props;

    const filteredListArray = Object.keys(filteredList);

    return (
      <div className={classes.root}>
        <div className={classes.checkBoxes}>
          <Checkbox
            checked={this.props.toggleFilter}
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc1.active,
              color: "white"
            }}
          />
          <Checkbox
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc2.active,
              color: "white"
            }}
          />
          <Checkbox
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc3.active,
              color: "white"
            }}
          />
          <Checkbox
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc4.active,
              color: "white"
            }}
          />
          <Checkbox
            className={classes.checkbox}
            disableRipple
            style={{
              backgroundColor: colorLabels.hlc5.active,
              color: "white"
            }}
          />
          Select All
          <Checkbox className={classes.allCheckbox} label="all" disableRipple />
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
                console.log("color labels", colorLabels);
                const {
                  userId,
                  color,
                  highlightedText,
                  updated,
                  annotations
                } = filteredList[highlightId];
                return (
                  <TableRow
                    className={classes.row}
                    onClick={() => this.handleHighlightClick(highlightId)}
                  >
                    <CustomTableCell>
                      <Avatar style={colorLabels}>{userId}</Avatar>
                    </CustomTableCell>

                    <CustomTableCell>{highlightedText}</CustomTableCell>
                    <CustomTableCell>
                      {moment(updated).fromNow()}
                    </CustomTableCell>
                    <CustomTableCell>annotations</CustomTableCell>
                  </TableRow>
                );
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
