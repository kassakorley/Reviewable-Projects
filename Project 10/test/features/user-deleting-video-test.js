const {assert} = require('chai');
const {buildVideoObject, stripHostnameFromUrl} = require('../test-utils.js');

describe('User deletes existing video', () => {
  it('is removed from video list', () => {
    const video = buildVideoObject();
    browser.url('/videos/create');
    browser.setValue('#title-input', video.title);
    browser.setValue('#url-input', video.url);
    browser.setValue('#description-input', video.description);
    browser.click('#submit-button');

    browser.click('#delete');

    assert.notInclude(browser.getText('body'), video.title);
  });
});
