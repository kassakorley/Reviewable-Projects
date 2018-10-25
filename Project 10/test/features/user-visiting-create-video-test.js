const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils.js');

describe('User visits the create video page,', () => {
  describe('a submission form is rendered,', () => {
    it('that posts to "/videos"', () => {
      browser.url('/videos/create');
      assert.include(browser.getAttribute('.input-form', 'action'), '/videos');
    });
  });

  describe('and posts a new video', () => {
    it('it is rendered', () => {
      const videoToCreate = buildVideoObject();
      browser.url('/videos/create');
      browser.setValue('#title-input', videoToCreate.title);
      browser.setValue('#url-input', videoToCreate.url);
      browser.setValue('#description-input', videoToCreate.description);

      browser.click('#submit-button');
      
      const url = browser.getAttribute('iframe.video-player', 'src');
      assert.include(url, videoToCreate.url);
      assert.include(browser.getText('body'), videoToCreate.title);
    });
  });

});
