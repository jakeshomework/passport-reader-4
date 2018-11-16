import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import ImageGalleryStepper from "./ImageGalleryStepper";
/* ----- MATERIAL-UI IMPORTS ----- */
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import renderHTML from "react-render-html";

/*---Opens modal when image is clicked in book.---*/
const styles = {
  modalRoot: {
    backgroundColor: "red",
    borderRadius: "10px"
  },
  modalStyle: {
    display: "flex",
    justifyContent: "center",
  },
  gallery: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageStyle: {
    //width: '100%',
    maxHeight: "65vh"
  },
  thumbnail: {
    maxHeight: 240,
    maxWidth: 240,
    margin: 10,

  }
};

class ImageGallery extends Component {
  state = {
    galleryIsOpen: false,
    galleryIndex: 0,
    imageIndex: 0
  };

  /*---Add one to position.---*/
  handleNext = () => {
    console.log("Neeeext");
    this.setState(prevState => {
      return { imageIndex: prevState.imageIndex + 1 };
    });
  };
  /*---Subtract one from position---*/
  handleBack = () => {
    console.log("BAAAK");
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

  /* --- render thumbnails in the respective gallery divs --- */

  renderGalleriesInDom() {
    const { galleries, bookName, focusMode, classes } = this.props;

    galleries.forEach((gallery, galleryIndex) => {
      ReactDOM.render(
        !focusMode ? (
          <div className={classes.gallery}>
            {gallery.map((image, imageIndex) => {
              const thumbnailSrc = image.thumbnail
                ? `book-${bookName}/${image.thumbnail}`
                : `book-${bookName}/${image.src}`;
              return (
                <div key={imageIndex}>
                  <Button
                    onClick={() => this.openGallery(galleryIndex, imageIndex)}
                  >
                    <img
                      src={thumbnailSrc}
                      className={classes.thumbnail}
                      alt=""
                    />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : null,
        document.getElementById(`image-gallery-${galleryIndex}`)
      );
    });
  }

  /* --- render the modal on the page --- */

  render() {
    const { galleries, classes, bookName } = this.props;
    const imageSrc = `book-${bookName}/${galleries[this.state.galleryIndex][
      this.state.imageIndex
    ].src}`;
    const imageCaption =
      galleries[this.state.galleryIndex][this.state.imageIndex].caption;

    return (
      <Dialog
        open={this.state.galleryIsOpen}
        onClose={this.closeGallery}
        className={{ paper: classes.modalRoot }}
      >
        <DialogContent className={classes.modalStyle}>
          <img src={imageSrc} alt="" className={classes.imageStyle} />
          <DialogContentText />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          {renderHTML(imageCaption)}
        </DialogActions>

        <DialogActions>
          <ImageGalleryStepper
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            position={this.state.imageIndex}
            length={galleries[this.state.galleryIndex].length}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

ImageGallery.propTypes = {
  galleries: PropTypes.array
};

export default withStyles(styles)(ImageGallery);
