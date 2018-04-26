// https://github.com/AaronCCWong/react-card-flip

import React from "react";
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { Motion, spring, presets } from "react-motion";
import FlipToFront from "material-ui-icons/FlipToFront";
import FlipToBack from "material-ui-icons/FlipToBack";

const styles = theme => ({
  root: {
    maxWidth: 900
  },
  containerContainer: {
    display: "flex",
    justifyContent: "space-around"
  },
  cardContainer: {
    position: "relative",
    perspective: "2000px",
    width: "90%",
    maxWidth: "960px"
    // backgroundColor: "red"
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
    width: "100%",
    height: "500px",
    marginTop: "20px"
  },
  cardContentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  flipButton: {
    marginBottom: 20
  }
});

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  handleTouchStart = e => {
    e.preventDefault();
    this.handleMouseDown();
  };

  handleFlip = e => {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
    // this.props.handleFlip();
  };

  resetCardFlip = () => {
    // console.log(this.props.data);
    if (this.props.data.position !== "center") {
      this.setState({ isFlipped: false });
      // console.log("I'm reset now", this.state);
    } else {
      // console.log("I'm the center", this.state);
    }
  };

  /*** Adding spacebar functionality ***/
  handleKeyPress = e => {
    if (
      this.props.data.position === "center" &&
      (e.code === "Space" || e.code === "ArrowUp" || e.code === "ArrowDown")
    ) {
      this.setState({ isFlipped: !this.state.isFlipped });
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const classes = this.props.classes;
    const cardContent = this.props.data;

    return (
      <div>
        <div>
          <Motion
            style={{
              x: spring(this.state.isFlipped ? 180 : 0),
              y: spring(
                cardContent.position === "right"
                  ? 200
                  : cardContent.position === "left"
                    ? -200
                    : 0,
                presets.gentle
              ),
              z: spring(this.state.isFlipped ? -100 : 0)
            }}
            onRest={this.resetCardFlip}
          >
            {({ x, y, z }) => (
              // children is a callback which should accept the current value of
              // `style`
              <div className={classes.containerContainer}>
                <div className={classes.cardContainer}>
                  <Card
                    className={classes.card}
                    key="front"
                    style={{
                      WebkitTransform: `rotateX(${x}deg)`,
                      transform: `rotateX(${x}deg)`,
                      right: `${y}%`
                    }}
                    onClick={this.handleFlip}
                    elevation={10}
                  >
                    {/*<transform: `rotate(${y}deg)`*/}
                    <CardContent className={classes.cardContentContainer}>
                      <Typography type="body1" className={classes.title}>
                        {cardContent.frontCategory}
                      </Typography>
                      <div className={classes.cardContent}>
                        <Typography variant="headline">
                          {cardContent.frontPrimary}
                        </Typography>
                        <Typography type="body1" className={classes.pos}>
                          {cardContent.frontSub}
                        </Typography>
                        <Typography component="p">
                          {cardContent.frontSecondary}
                        </Typography>
                      </div>
                      <Button
                        onClick={this.handleFlip}
                        dense
                        className={classes.flipButton}
                      >
                        {cardContent.buttonText}
                        <FlipToBack />
                      </Button>
                    </CardContent>
                  </Card>
                  <Card
                    className={classes.card}
                    key="back"
                    style={{
                      WebkitTransform: `rotateX(${180 + x}deg) `,
                      transform: `rotateX(${180 + x}deg)`,
                      right: `${y}%`
                    }}
                    onClick={this.handleFlip}
                    elevation={10}
                  >
                    <CardContent className={classes.cardContentContainer}>
                      <Typography type="body1" className={classes.title}>
                        {cardContent.backCategory}
                      </Typography>
                      <div className={classes.cardContent}>
                        <Typography variant="headline" component="h2">
                          {cardContent.backPrimary}
                        </Typography>
                        <Typography type="body1" className={classes.pos}>
                          {cardContent.backSub}
                        </Typography>
                        <Typography component="p">
                          {cardContent.backSecondary}
                        </Typography>
                      </div>
                      <Button
                        onClick={this.handleFlip}
                        className={classes.flipButton}
                      >
                        {cardContent.buttonText}
                        <FlipToFront />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

FlashCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object
};

export default withStyles(styles)(FlashCard);
