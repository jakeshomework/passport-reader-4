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
import { Avatar } from "material-ui";
import Card, { CardHeader, CardContent } from "material-ui/Card";

/* ----- ICON IMPORTS ----- */
import VideocamIcon from "material-ui-icons/Videocam";

/* ----- COLOR IMPORTS ----- */
import { colorLabels } from "../config/colorLabels";
import grey from "material-ui/colors/grey";

/*--- CUSTOM STYLES ---*/
const styles = theme => ({
  root: { paddingBottom: 50 },
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
    margin: theme.spacing.unit
  },
  badge: {
    marginRight: 10,
    display: "inherit",
    paddingRight: 3,
    marginTop: 20
  },
  card: {
    width: "96%",
    margin: theme.spacing.unit,
    minHeight: 170
  },
  cardList: {
    paddingTop: 100
  }
});

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

  filter1 = prop => (event, checked) => {
    this.setState({ [prop]: checked });
  }
  filter2 = prop => (event, checked) => {
    this.setState({ [prop]: checked });
  }
  filter3 = prop => (event, checked) => {
    this.setState({ [prop]: checked });
  }
  filter4 = prop => (event, checked) => {
    this.setState({ [prop]: checked });
  }
  filter5 = prop => (event, checked) => {
    this.setState({ [prop]: checked });
  }

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
    console.log("filtered list: ", filteredList)

    return (
      <div className={classes.root}>
        <div className={classes.checkBoxes}>
          <Checkbox
            checked={hlc1}
            onChange={this.filter1("hlc1")}
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
            onChange={this.filter2("hlc2")}
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
            onChange={this.filter3("hlc3")}
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
            onChange={this.filter4("hlc4")}
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
            onChange={this.filter5("hlc5")}
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
        <div className={classes.cardList}>
          <Grid container spacing={24}>
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
                <Grid item xs={12} sm={4}>
                  <Card
                    className={classes.card}
                    onClick={() =>
                      this.props.annotationModalControl.open([highlightId])
                    }
                    key={i}
                    value={color}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: colorLabels[color].active
                          }}
                        >
                          {initials}
                        </Avatar>
                      }
                      title="Last Updated"
                      subheader={moment(updatedAt).fromNow()}
                      action={
                        <span>
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
                        </span>
                      }
                    />
                    <CardContent>
                      <Typography>{renderHTML(highlightedText)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ) : null;
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

HighlightsList.propTypes = {
  annotationModalControl: PropTypes.object,
  classes: PropTypes.object,
  filteredList: PropTypes.object,
  users: PropTypes.object
};

export default withStyles(styles)(HighlightsList);
