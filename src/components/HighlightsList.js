import React, { Component } from "react";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import Highlight from "./Highlight";
import { withStyles } from "material-ui/styles";
import List, { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import grey from "material-ui/colors/grey";

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
    fontSize: 14
  }
}))(TableCell);

/*---Displays a list of Highlights ---*/
const styles = theme => ({
  root: {
    // width: "100%",
    flexGrow: 1,
    padding: theme.spacing.unit * 4
  },
  table: {
    // marginTop: theme.spacing.unit * 2
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  tableHead: {
    backgroundColor: grey["A400"]
  },
  checkbox: {
    marginRight: "20px"
  },
  allCheckbox: {
    marginLeft: "10px",
    color: "white",
    backgroundColor: grey["A100"]
  },
  checkBoxes: {
    float: "left",
    paddingBottom: theme.spacing.unit * 4
  }
});

function createData(userId, content, date) {
  return { userId, content, date };
}
const data = [createData("TS", "this is the content", "14days ago")];

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

  render() {
    const getData = this.props.filteredList;
    console.log("getData", getData);

    const { classes } = this.props;
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
                <CustomTableCell>Content</CustomTableCell>
                <CustomTableCell>Date</CustomTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map(highlight => {
                return (
                  <TableRow
                    className={classes.row}
                    key={highlight.id}
                    onClick={this.props.annotationModalControl.open}
                  >
                    <CustomTableCell>
                      <Avatar>{highlight.userId}</Avatar>
                    </CustomTableCell>

                    <CustomTableCell>{highlight.content}</CustomTableCell>
                    <CustomTableCell>{highlight.date}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* <Highlight listItem={this.props.filteredList} /> */}
        </div>
      </div>
    );
  }
}

HighlightsList.propTypes = {
  filteredList: PropTypes.array
};

export default withStyles(styles)(HighlightsList);
