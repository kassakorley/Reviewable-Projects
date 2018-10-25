const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils.js');

describe('User visits the update video page', () => {
  describe('and updates the video', () => {

    it('the values are changed', () => {
      const origVideo = buildVideoObject();
      const updatedVideo = buildUpdatedVideo();
      browser.url('/videos/create');
      browser.setValue('#title-input', origVideo.title);
      browser.setValue('#url-input', origVideo.url);
      browser.setValue('#description-input', origVideo.description);
      browser.click('#submit-button');

      browser.click('#edit');
      browser.setValue('#title-input', updatedVideo.title);
      browser.setValue('#url-input', updatedVideo.url);
      browser.setValue('#description-input', updatedVideo.description);
      browser.click('#submit-button');

      const srcUrl = browser.getAttribute('iframe.video-player', 'src');
      assert.include(srcUrl, updatedVideo.url);
      assert.include(browser.getText('body'), updatedVideo.title);
      assert.include(browser.getText('body'), updatedVideo.description);
    });

    it('it does not create a new video', () => {
      const origVideo = buildVideoObject();
      const updatedVideo = buildUpdatedVideo();
      browser.url('/videos/create');
      browser.setValue('#title-input', origVideo.title);
      browser.setValue('#url-input', origVideo.url);
      browser.setValue('#description-input', origVideo.description);
      browser.click('#submit-button');

      browser.click('#edit');
      browser.setValue('#title-input', updatedVideo.title);
      browser.setValue('#url-input', updatedVideo.url);
      browser.setValue('#description-input', updatedVideo.description);
      browser.click('#submit-button');

      browser.url('/videos');
      assert.notInclude(browser.getText('body'), origVideo.title);
    });

    const buildUpdatedVideo = () => {
      return {
        title: 'An updated title',
        url: 'https://www.youtube.com/embed/NOb6p7fBNII',
        description: 'An updated description'
      };
    };

  });
});
