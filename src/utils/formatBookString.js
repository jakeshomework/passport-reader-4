export const formatBookString = originalContent => {
  // ========================================= //
  // ****************** TODO ***************** //
  // ========================================= //
  // each image needs book-bookname/ in order to load the image correctly.

  // ========================================= //
  // ******* DEFINE REGEX EXPRESSIONS ******** //
  // ========================================= //
  // let regExAudioElements = /<audio (.*?)>(.*?)<\/audio>/g;

  // ========================================= //
  // ******** HANDLE ASIDE ELEMENTS ********** //
  // ========================================= //
  const regExAsideBlock = /<aside (.*)<\/aside>/g; // use for separating asides from main content
  const regExAsideElements = /(<aside .*?<\/aside>)/g; // use for splitting asideString into asides

  // ===== CREATE STRING OF ASIDE ELEMENTS ===== //
  const asideString = originalContent.match(regExAsideBlock)
    ? originalContent.match(regExAsideBlock).join("")
    : null;

  // ===== SPLIT ASIDE ELEMENTS INTO ARRAY, REMOVE SPACES ===== //
  const asides = asideString
    ? asideString.split(regExAsideElements).filter(function(item) {
        return item !== "";
      })
    : [];

  // console.log(asides);

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

  let galleries = [];
  for (let j = 0; j < galleryArray.length; j++) {
    let currentGallery = galleryArray[j];

    let thumbnailArray = currentGallery.match(regExImageThumbnail);
    let fullSizeArray = currentGallery.match(regExImageFullSize);
    let captionArray = currentGallery.match(regExFigCaption);
    galleries[j] = [];

    // console.log({ thumbnailArray, fullSizeArray, captionArray });

    // ===== BUILD GALLERY OBJECT FROM FULL SIZE IMAGES ===== //
    for (let k = 0; k < fullSizeArray.length; k++) {
      galleries[j][k] = {
        thumbnail: thumbnailArray ? thumbnailArray[k].slice(20, -1) : null,
        src: fullSizeArray[k].slice(6, -1),
        caption: captionArray[k]
          .replace(/<figcaption .*?"caption">/, "")
          .replace("</figcaption>", "")
      };
    }
  }

  // console.log({ galleryArray });

  // ========================================= //
  // ******** HANDLE LINK TAG ELEMENTS ******* //
  // ========================================= //
  const regExLinkTag = /<link .*?>/g;
  const links = originalContent.match(regExLinkTag);

  // ====================================================== //
  // * REMOVE ASIDE & LINK TAG ELEMENTS FROM MAIN CONTENT * //
  // ====================================================== //
  let bookDisplayString = originalContent
    .replace(regExAsideBlock, "")
    .replace(regExLinkTag, "");

  // ================================================== //
  // * REPLACE IMAGE GALLERY ELEMENTS WITH GALLERY ID * //
  // ================================================== //
  for (let i = 0; i < galleries.length; i++) {
    bookDisplayString = bookDisplayString.replace(
      regExImageGallerySingle,
      `<div id="image-gallery-${i}"></div>`
    );
  }

  // =========================================================== //
  // ******** DEFINE BOOK ARRAY FROM BOOK STRING *************** //
  // =========================================================== //

  let bookArray = bookDisplayString.split(/(<.*?>{1})/g).filter(item => {
    return item !== "";
  });

  function isBody(el) {
    return el === "<body>";
  }

  let bodyIndex = bookArray.findIndex(isBody);

  let bookDisplay = {}; // EMPTY OBJECT TO PUSH PROCESSED ELEMENTS TO
  let elementId = 0;

  // ===== REFINE BOOK ARRAY WITH CUSTOM PROPERTIES ===== //

  for (var i = 0; i < bookArray.length; i++) {
    if (i > bodyIndex && bookArray[i][0] !== "<") {
      let textString = bookArray[i];

      // ===== add <span id="*"> to all text / space elements ===== //
      let splitText = textString
        .split(/(\s)/g)
        .filter(item => {
          return item !== "";
        })
        //   ***   SCENERIO 1/4   ***   //
        .map(item => {
          let tempObj = {
            id: `emc-${elementId}`,
            type: item === " " || item === "	" ? "space" : "text",
            content: item,
            display: `<span id="emc-${elementId}">${item}</span>`,
            highlights: []
          };
          bookDisplay[`emc-${elementId}`] = tempObj;
          elementId++;
          return tempObj;
        });
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

        //   ***   SCENERIO 2/4   ***   //
        bookDisplay[`emc-${elementId}`] = {
          id: `emc-${elementId}`,
          type: "aside",
          display: newTempATag
        };
        elementId++;
      } else {
        //   ***   SCENERIO 3/4   ***   //
        bookDisplay[`emc-${elementId}`] = {
          id: `emc-${elementId}`,
          type: "a-tag",
          display: tempATag
        };
        elementId++;
      }
    } else {
      //   ***   SCENERIO 4/4   ***   //
      // ===== DEFAULT - for standard tag elements ===== //
      bookDisplay[`emc-${elementId}`] = {
        id: `emc-${elementId}`,
        type: bookArray[i].includes(`id="image-gallery`) ? "gallery" : "tag",
        display: bookArray[i]
      };
      elementId++;
    }
  }

  // ============================================== //
  // ******** RETURN FORMATTED BOOK *************** //
  // ============================================== //
  return {
    asides,
    galleries,
    bookDisplay,
    links
  };
};

/*





  // ================================================= //
  // ***** SPLIT BOOK INTO ARRAY & ADD CUSTOM IDS ***** //
  // ================================================== //

};
*/
