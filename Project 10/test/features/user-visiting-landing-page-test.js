const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils.js');

describe('User visits landing page', () => {

  describe('user can navigate', () => {
    it('to the create page', () => {
      browser.url('/videos');
      browser.click('a[href="/videos/create"]');
      assert.include(browser.getText('body'), 'Save a video');
    });
  });

  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/videos');
      assert.equal(browser.getText('#videos-containers'), '');
    });
  });

  describe('with existing video', () => {
    it('renders the video title', () => {
      const videoToCreate = createVideo();
      assert.include(browser.getText('body'), videoToCreate.title);
    });

    it('renders an inframe with the url', () => {
      const videoToCreate = createVideo();
      const url = browser.getAttribute('iframe.video-player', 'src');
      assert.include(url, videoToCreate.url);
    });

    describe('user can navigate', () => {
      it('to the show page for the video', () => {
        const videoToCreate = createVideo();

        browser.click('.video-link');
        
        const videoUrl = browser.getAttribute('iframe.video-player', 'src');
        assert.equal(browser.getUrl().endsWith('/videos'), false);
        assert.include(videoUrl, videoToCreate.url);
        assert.include(browser.getText('body'), videoToCreate.title);
      });
    });
  });

  function createVideo() {
    const videoToCreate = buildVideoObject();
    browser.url('/videos/create');
    browser.setValue('#title-input', videoToCreate.title);
    browser.setValue('#description-input', videoToCreate.description);
    browser.setValue('#url-input', videoToCreate.url);
    browser.click('#submit-button');
    browser.url('/videos');
    return videoToCreate;
  }

});
