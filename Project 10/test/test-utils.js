const {jsdom} = require('jsdom');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const url = options.imageUrl || 'https://youtu.be/b5wGGp88nBs';
  const description = options.description || 'Just the best video';
  return {title, url, description};
};

const buildInvalidVideoObject = () => {
  const invalidVideo = buildVideoObject();
  invalidVideo.title = '';
  invalidVideo.url = '';
  return invalidVideo;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildVideoObject,
  buildInvalidVideoObject,
  parseTextFromHTML
};
