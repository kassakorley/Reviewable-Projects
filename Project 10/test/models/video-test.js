const {assert} = require('chai');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utils.js');
const {buildVideoObject} = require('../test-utils.js');
const Video = require('../../models/video');

describe('#Model: Video', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('#title', () => {
    it('has type String', () => {
      const titleAsNonString = 1;
      const video = new Video({title: titleAsNonString});
      assert.strictEqual(video.title, titleAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.title.message, 'Title is required');
    });
  });

  describe('#url', () => {
    it('has type String', () => {
      const urlAsNonString = 1;
      const video = new Video({url: urlAsNonString});
      assert.strictEqual(video.url, urlAsNonString.toString());
    });
    it('is required', () => {
      const video = new Video({});
      video.validateSync();
      assert.equal(video.errors.url.message, 'A URL is required');
    });
  });

  describe('#description', () => {
    it('has type String', () => {
      const descAsNonString = 1;
      const video = new Video({description: descAsNonString});
      assert.strictEqual(video.description, descAsNonString.toString());
    });
  });

});
