import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/* ----- MATERIAL-UI IMPORTS ----- */
import Dialog, { DialogActions, DialogContent } from "material-ui/Dialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Slide from "material-ui/transitions/Slide";
import IconButton from "material-ui/IconButton";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "material-ui-icons/KeyboardArrowRight";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import grey from "material-ui/colors/grey";

/* --- IMPORT EXTERNAL LIBRARIES --- */
import renderHTML from "react-render-html";

/* ----- COMPONENT IMPORTS ----- */
import ImageGalleryStepper from "./ImageGalleryStepper";

/*---Opens modal when image is clicked in book.---*/
const styles = {
  modalStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 50
  },
  gallery: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: 250,
    height: 240,
    margin: "0 auto"
  },
  imageStyle: {
    //width: '100%',
    maxHeight: "65vh",
    maxWidth: "100%"
  },
  miniThumbnailContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  miniThumbnailDotContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  miniThumbnail: {
    height: 50
  },
  thumbnail: {
    maxHeight: 240,
    maxWidth: 240,
    margin: 10
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImageGallery extends Component {
  state = {
    galleryIsOpen: false,
    galleryIndex: 0,
    imageIndex: 0
  };

  /*---Add one to position.---*/
  handleNext = () => {
    this.setState(prevState => {
      return { imageIndex: prevState.imageIndex + 1 };
    });
  };
  /*---Subtract one from position---*/
  handleBack = () => {
    this.setState(prevState => {
      return { imageIndex: prevState.imageIndex - 1 };
    });
  };

  openGallery = (galleryIndex, imageIndex) => {
    this.setState({
      galleryIsOpen: true,
      galleryIndex: galleryIndex,
      imageIndex: imageIndex
    });
  };

  closeGallery = () => {
    this.setState({ galleryIsOpen: false });
  };

  componentDidMount() {
    this.renderGalleriesInDom();
  }

  componentDidUpdate() {
    this.renderGalleriesInDom();
  }

  setImageIndex = imageIndex => {
    this.setState({ imageIndex: imageIndex });
  };

  /* --- render thumbnails in the respective gallery divs --- */

  renderGalleriesInDom() {
    const { galleries, bookName, focusMode, classes } = this.props;

    galleries.forEach((gallery, galleryIndex) => {
      const thumbnailSrc = gallery[this.state.imageIndex].thumbnail
        ? `book-${bookName}/${gallery[this.state.imageIndex].thumbnail}`
        : `book-${bookName}/${gallery[this.state.imageIndex].src}`;

      ReactDOM.render(
        !focusMode ? (
          <div className={classes.gallery}>
            <IconButton
              onClick={this.handleBack}
              disabled={this.state.imageIndex === 0}
            >
              <KeyboardArrowLeft />
            </IconButton>

            <div key={this.state.imageIndex}>
              <Button
                onClick={() =>
                  this.openGallery(galleryIndex, this.state.imageIndex)
                }
              >
                <img src={thumbnailSrc} className={classes.thumbnail} alt="" />
              </Button>

              <div className={classes.miniThumbnailDotContainer}>
                {gallery.map((dot, dotIndex) => {
                  const activeDot = { color: "#4695ec" };
                  const inactiveDot = { color: grey[500] };

                  return (
                    <div
                      key={dotIndex}
                      style={
                        dotIndex === this.state.imageIndex
                          ? activeDot
                          : inactiveDot
                      }
                    >
                      ●
                    </div>
                  );
                })}
              </div>
            </div>
            <IconButton
              onClick={this.handleNext}
              disabled={this.state.imageIndex === gallery.length - 1}
            >
              <KeyboardArrowRight />
            </IconButton>
          </div>
        ) : null,
        document.getElementById(`image-gallery-${galleryIndex}`)
      );
    });
  }

  /* --- render the modal on the page --- */

  render() {
    const { galleries, classes, bookName } = this.props;
    const imageSrc = `book-${bookName}/${
      galleries[this.state.galleryIndex][this.state.imageIndex].src
    }`;
    const imageCaption =
      galleries[this.state.galleryIndex][this.state.imageIndex].caption;

    return (
      <Dialog
        open={this.state.galleryIsOpen}
        onClose={this.closeGallery}
        classes={{ paper: classes.modalRoot }}
        fullScreen
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.closeGallery}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              CLOSE
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.modalStyle}>
          <div>
            <img src={imageSrc} alt="" className={classes.imageStyle} />
            <Typography style={{ justifyContent: "center" }}>
              {renderHTML(imageCaption)}
            </Typography>
          </div>
          <div className={classes.miniThumbnailContainer}>
            {galleries[this.state.galleryIndex].map((image, imageIndex) => {
              const activeStyle = { border: "solid #4695ec" };
              const inactiveStyle = { opacity: 0.5 };
              const thumbnailSrc = image.thumbnail
                ? `book-${bookName}/${image.thumbnail}`
                : `book-${bookName}/${image.src}`;
              return (
                <Button
                  key={imageIndex}
                  onClick={() => this.setImageIndex(imageIndex)}
                >
                  <img
                    src={thumbnailSrc}
                    alt={image.caption}
                    className={classes.miniThumbnail}
                    style={
                      imageIndex === this.state.imageIndex
                        ? activeStyle
                        : inactiveStyle
                    }
                  />
                </Button>
              );
            })}
          </div>
        </DialogContent>

        <DialogActions>
          <ImageGalleryStepper
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            closeGallery={this.closeGallery}
            position={this.state.imageIndex}
            length={galleries[this.state.galleryIndex].length}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

ImageGallery.propTypes = {
  bookName: PropTypes.string,
  classes: PropTypes.object,
  focusMode: PropTypes.bool,
  galleries: PropTypes.array
};

export default withStyles(styles)(ImageGallery);
