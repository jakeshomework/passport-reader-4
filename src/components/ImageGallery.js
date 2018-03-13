import React from "react"; 
import PropTypes from "prop-types";
/* ----- COMPONENT IMPORTS ----- */
import ImageGalleryStepper from "./ImageGalleryStepper";

/*---Opens modal when image is clicked in book.---*/

const ImageGallery = ({gallery}) => {
	/*---Add one to position.---*/
	const handleNext = () => {}
	/*---Subtract one from position---*/
	const handleBack = () => {}
	
	return(
		<div>ImageGallery
			<ImageGalleryStepper handleNext="func" handleBack="func" />
		</div>
	)
}

ImageGallery.propTypes = {
	gallery: PropTypes.object
}

export default ImageGallery;