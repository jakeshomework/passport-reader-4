export const buildDisplayContent = originalContent => {
  // ========================================= //
  // ******* DEFINE REGEX EXPRESSIONS ******** //
  // ========================================= //
  // let regExAudioElements = /<audio (.*?)>(.*?)<\/audio>/g;

  // ========================================= //
  // ******** HANDLE ASIDE ELEMENTS ********** //
  // ========================================= //
  const regExAsideBlock = /<aside (.*)<\/aside>/g; // use for separating asides from main content
  const regExAsideElements = /(<aside .*?<\/aside>)/g; // use for splitting asideString into asideArray

  // ===== CREATE STRING OF ASIDE ELEMENTS ===== //
  const asideString = originalContent.match(regExAsideBlock)
    ? originalContent.match(regExAsideBlock).join("")
    : null;

  // ===== SPLIT ASIDE ELEMENTS INTO ARRAY, REMOVE SPACES ===== //
  const asideArray = asideString
    ? asideString.split(regExAsideElements).filter(function(item) {
        return item !== "";
      })
    : [];

  // console.log(asideArray);

  // ========================================= //
  // ******** HANDLE GALLERY ELEMENTS ******** //
  // ========================================= //
  const regExImageGallery = /<object id="gallery.*?\/object>/g; // use for getting image gallery sections
  const regExImageGallerySingle = /<object id="gallery.*?\/object>/; // use for getting image gallery sections
  const regExImageThumbnail = /data-thumbnail-src.*?=".*?"/g; // use for getting array of thumbnail image src
  const regExImageFullSize = / src.*?=".*?"/g; // use for getting array of full size image src
  const regExFigCaption = /<figcaption .*?"caption">.*?<\/figcaption>/g; //use for getting image captions

  // ===== CREATE ARRAY OF GALLERY OBJECTS ===== //
  const galleryArray = originalContent.match(regExImageGallery)
    ? originalContent.match(regExImageGallery)
    : [];

  let imageArray = [];
  for (let j = 0; j < galleryArray.length; j++) {
    let currentGallery = galleryArray[j];

    let thumbnailArray = currentGallery.match(regExImageThumbnail);
    let fullSizeArray = currentGallery.match(regExImageFullSize);
    let captionArray = currentGallery.match(regExFigCaption);
    imageArray[j] = [];

    // console.log({ thumbnailArray, fullSizeArray, captionArray });

    // ===== BUILD GALLERY OBJECT FROM FULL SIZE IMAGES ===== //
    for (let k = 0; k < fullSizeArray.length; k++) {
      imageArray[j][k] = {
        thumbnail: thumbnailArray ? thumbnailArray[k].slice(20, -1) : null,
        src: fullSizeArray[k].slice(6, -1),
        caption: captionArray[k]
          .replace(/<figcaption .*?"caption">/, "")
          .replace("</figcaption>", "")
      };
    }
  }

  // console.log({ galleryArray });
  // console.log({ imageArray });

  // ========================================= //
  // ******** HANDLE LINK TAG ELEMENTS ******* //
  // ========================================= //
  const regExLinkTag = /<link .*?>/g;
  const linkTagArray = originalContent.match(regExLinkTag);

  // ====================================================== //
  // * REMOVE ASIDE & LINK TAG ELEMENTS FROM MAIN CONTENT * //
  // ====================================================== //
  let bookDisplayString = originalContent
    .replace(regExAsideBlock, "")
    .replace(regExLinkTag, "");

  // ================================================== //
  // * REPLACE IMAGE GALLERY ELEMENTS WITH GALLERY ID * //
  // ================================================== //
  for (let i = 0; i < imageArray.length; i++) {
    bookDisplayString = bookDisplayString.replace(
      regExImageGallerySingle,
      `<div id="image-gallery-${i}"></div>`
    );
  }

  // =========================================================== //
  // ******** DEFINE BOOK ARRAY FROM BOOK STRING *************** //
  // =========================================================== //

  let bookArray = bookDisplayString.split(/(<.*?>{1})/g).filter(function(item) {
    return item !== "";
  });

  function isBody(el) {
    return el === "<body>";
  }

  let bodyIndex = bookArray.findIndex(isBody);

  let bookDisplay = []; // EMPTY ARRAY TO PUSH PROCESSED ELEMENTS TO
  let prId = 0; // INITIAL PR-# ID

  // ===== REFINE BOOK ARRAY WITH CUSTOM PROPERTIES ===== //

  bookArray.forEach(item => {});

  for (var i = 0; i < bookArray.length; i++) {
    if (i > bodyIndex && bookArray[i][0] !== "<") {
      // ===== add <span id="*"> to all text elements ===== //
      let textString = bookArray[i];
      let splitText = textString.split(/\s/g);

      console.log({ splitText });

      bookDisplay.push(`<span id="pr-${prId}">${bookArray[i]}</span>`);
      prId++;
    } else if (bookArray[i][1] === "a" && bookArray[i][2] === " ") {
      // ===== change 'href' to 'id' on all links ===== //
      let tempATag = bookArray[i]
        .replace("href", "id")
        .replace('epub:type="noteref"', "");
      // === for aside popover links, add class "aside-tag" === //
      if (tempATag.includes("popup")) {
        let splitATagArray = tempATag.split("");
        //console.log(splitATagArray);
        splitATagArray.splice(3, 0, 'class="aside-tag"');
        let newTempATag = splitATagArray.join("");
        bookDisplay.push(newTempATag);
      } else bookDisplay.push(tempATag);
    } else {
      // else if ()
      // { // ===== check for image tags -- add id -- add to imageArray ===== //
      //
      // }
      // ===== DEFAULT - for standard tag elements ===== //
      bookDisplay.push(bookArray[i]);
    }
  }

  // ============================================== //
  // ******** RETURN FORMATTED BOOK *************** //
  // ============================================== //
  return {
    bookDisplayString,
    asideArray,
    imageArray,
    bookDisplay,
    linkTagArray
  };
};

/*





  // ================================================= //
  // ***** SPLIT BOOK INTO ARRAY & ADD CUSTOM IDS ***** //
  // ================================================== //

};
*/
