import React, { Component } from "react";
import PropTypes from "prop-types";

/* ----- COMPONENT IMPORTS ----- */
import renderHTML from "react-render-html";
import moment from "moment";

/* ----- UI IMPORTS ----- */
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Typography from "material-ui/Typography";
import Badge from "material-ui/Badge";
import NoteIcon from "material-ui-icons/Note";
import MicIcon from "material-ui-icons/Mic";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import { Avatar } from "material-ui";

/* ----- ICON IMPORTS ----- */
import VideocamIcon from "material-ui-icons/Videocam";

/* ----- COLOR IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";
import grey from "material-ui/colors/grey";

/* ----- TABLE STYLES ----- */
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.white
  },
  body: {
    fontSize: theme.typography.fontSize
  }
}))(TableCell);

/*--- CUSTOM STYLES ---*/
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  },
  checkbox: {
    marginRight: 10,
    marginBottom: 10
  },
  allCheckbox: {
    marginRight: 10,
    marginLeft: 14,
    color: "white",
    backgroundColor: grey["700"],
    marginBottom: 10
  },
  checkBoxes: {
    float: "left",
    paddingBottom: theme.spacing.unit * 4
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
  badge: {
    marginRight: "20px"
  },
  tableHead: {
    backgroundColor: grey["700"],
    color: "black"
  }
  // tableCellHead: {
  //   paddingLeft: 5
  // },
  // tableCellDate: {
  //   padding: 0
  // },
  // tableCellBody: {
  //   padding: 10
  // },
  // tableCellAnnotations: {
  //   display: "inline-block"
  //   padding: "20px 5px 5px 10px"
  // },
});

function createData(userId, highlightedText, updatedAt, annotations) {
  return { userId, highlightedText, updatedAt, annotations };
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

  toggleHighlight = prop => (event, checked) => {
    this.setState({ [prop]: checked });
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
            onChange={this.toggleHighlight("hlc1")}
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
            onChange={this.toggleHighlight("hlc2")}
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
            onChange={this.toggleHighlight("hlc3")}
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
            onChange={this.toggleHighlight("hlc4")}
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
            onChange={this.toggleHighlight("hlc5")}
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
            label="All"
          />
        </div>
        <div>
          <Grid container spacing={24}>
            <Grid item xs />
            <Grid item xs={12}>
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow className={classes.tableRow}>
                    <CustomTableCell className={classes.tableCellHead}>
                      User
                    </CustomTableCell>
                    <CustomTableCell className={classes.tableCellHead}>
                      Highlighted Text
                    </CustomTableCell>

                    <CustomTableCell
                      hidden={{ xsDown: true }}
                      className={classes.tableCellDate}
                    >
                      <Grid hidden={{ xsDown: true }}>Date</Grid>
                    </CustomTableCell>

                    <CustomTableCell className={classes.tableCellHead}>
                      Annotations
                    </CustomTableCell>
                  </TableRow>
                </TableHead>

                <TableBody className={classes.tableBody}>
                  {filteredListArray.map((highlightId, i) => {
                    const {
                      userId,
                      color,
                      highlightedText,
                      updatedAt,
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
                        key={i}
                        value={color}
                      >
                        <CustomTableCell className={classes.tableCellBody}>
                          <Avatar
                            style={{
                              backgroundColor: colorLabels[color].active
                            }}
                          >
                            {initials}
                          </Avatar>
                        </CustomTableCell>

                        <CustomTableCell className={classes.tableCellBody}>
                          <Typography>{renderHTML(highlightedText)}</Typography>
                        </CustomTableCell>

                        <CustomTableCell className={classes.tableCellDate}>
                          <Grid hidden={{ xsDown: true }}>
                            {moment(updatedAt).fromNow()}
                          </Grid>
                        </CustomTableCell>

                        <CustomTableCell
                          className={classes.tableCellAnnotations}
                        >
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
            </Grid>
          </Grid>
          <Grid item xs />
        </div>
      </div>
    );
  }
}

// HighlightsList.propTypes = {
//   filteredList: PropTypes.array
// };

export default withStyles(styles)(HighlightsList);
