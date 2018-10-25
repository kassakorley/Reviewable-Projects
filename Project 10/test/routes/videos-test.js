const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {buildVideoObject, buildInvalidVideoObject, parseTextFromHTML} = require('../test-utils.js');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utils.js');


describe('Server path: /videos', () => {

  beforeEach(connectDatabaseAndDropData);
  afterEach(disconnectDatabase);

  describe('GET', () => {

    describe('/videos/:videoId', () => {
      it('renders the video', async () => {
        const videoToCreate = buildVideoObject();
        await request(app).post('/videos').type('form').send(videoToCreate);
        const createdVideo = await Video.findOne(videoToCreate);
        const response = await request(app).get('/videos/' + createdVideo._id);
        const expectTitle = parseTextFromHTML(response.text, '.video-title h1');
        const expectDesc = parseTextFromHTML(response.text, '.video-description');
        assert.include(expectTitle, createdVideo.title);
        assert.include(expectDesc, createdVideo.description);
      });
    });

    describe('/videos/:videoId/edit', () => {
      it('renders a form populated with the video data', async () => {
        const videoToCreate = buildVideoObject();
        await request(app).post('/videos').type('form').send(videoToCreate);
        const createdVideo = await Video.findOne(videoToCreate);
        const response = await request(app).get('/videos/' + createdVideo._id + '/edit');
        assert.include(response.text, createdVideo.title);
        assert.include(response.text, createdVideo.title);
        assert.include(response.text, createdVideo.url);
        assert.include(response.text, createdVideo.description);
      });
    });

  });

  describe('POST', () => {

    describe('/videos', () => {

      describe('a valid video', () => {

        it('it saves the new video', async () => {
          const validVideo = buildVideoObject();
          const response = await request(app).post('/videos').type('form').send(validVideo);
          const createdVideo = await Video.findOne(validVideo);
          assert.isOk(createdVideo, 'Video not created successfully in database');
          assert.equal(createdVideo.title, validVideo.title);
          assert.equal(createdVideo.url, validVideo.url);
        });

        it('redirects to "/videos/:videoId"', async () => {
          const validVideo = buildVideoObject();
          const response = await request(app).post('/videos').type('form').send(validVideo);
          const createdVideo = await Video.findOne(validVideo);
          const expectedUrl = '/videos/' + createdVideo._id;
          assert.equal(expectedUrl, response.header.location);
          assert.equal(response.status, 302);
        });

      });

      describe('an invalid video', () => {
        describe('without a title and url', () => {
          it('does not save the video', async () => {
            const invalidVideo = buildInvalidVideoObject();
            const response = await request(app).post('/videos').type('form').send(invalidVideo);
            const result = await Video.find({});
            assert.equal(result.length, 0);
          });
          it('responds with a 400 status code', async () => {
            const invalidVideo = buildInvalidVideoObject();
            const response = await request(app).post('/videos').type('form').send(invalidVideo);
            assert.equal(response.status, 400);
          });
          it('renders the add video form', async () => {
            const invalidVideo = buildInvalidVideoObject();
            const response = await request(app).post('/videos').type('form').send(invalidVideo);
            assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
          });
          it('renders error messages', async () => {
            const invalidVideo = buildInvalidVideoObject();
            const response = await request(app).post('/videos').type('form').send(invalidVideo);
            assert.include(response.text, 'Title is required');
            assert.include(response.text, 'URL is required');
          });
          it('perserves other field values', async () => {
            const invalidVideo = buildInvalidVideoObject();
            const response = await request(app).post('/videos').type('form').send(invalidVideo);
            assert.include(response.text, invalidVideo.description);
          });
        });
      });

    });

    describe('/videos/:videoId/updates', () => {

      it('updates the video document', async () => {
        const video = buildVideoObject();
        await request(app).post('/videos').type('form').send(video);
        const origVideo = await Video.findOne(video);
        const updated = {
          title: 'An updated title',
          url: 'https://www.youtube.com/embed/NOb6p7fBNII',
          description: 'An updated description'
        }
        const postTo = '/videos/' + origVideo._id + '/updates';
        const response = await request(app).post(postTo).type('form').send(updated);
        assert.equal(response.status, 302);
      });

      it('does not allow invalid updates', async () => {
        const video = buildVideoObject();
        await request(app).post('/videos').type('form').send(video);
        const origVideo = await Video.findOne(video);
        const invalidUpdate = {
          title: '',
          url: '',
          description: 'An updated description'
        }
        const postTo = '/videos/' + origVideo._id + '/updates';
        const response = await request(app).post(postTo).type('form').send(invalidUpdate);
        assert.equal(response.status, 400);
        assert.include(response.text, 'Title is required');
        assert.include(response.text, 'URL is required');
      });

    });

    describe('/videos/:videoId/deletions', () => {

      it('removes the video', async () => {
        let video = buildVideoObject();
        await request(app).post('/videos').type('form').send(video);
        const videoToDelete = await Video.findOne(video);
        video._id = videoToDelete._id;
        const postTo = '/videos/' + videoToDelete._id + '/deletions';
        const response = await request(app).post(postTo).type('form').send(video);
        assert.equal(response.status, 302);
        assert.notInclude(response.text, videoToDelete.title);
        assert.notInclude(response.text, videoToDelete.url);
      });

    });

  });
});
