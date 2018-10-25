const router = require('express').Router();
const Video = require('../models/video');

router.get('/videos', async (req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});

router.post('/videos', async (req, res) => {
  const {title, url, description} = req.body;
  const video = new Video({title, url, description});
  const errors = video.validateSync();
  if (errors) {
    res.status(400).render('videos/create', {video: video});
  } else {
    const saved = await video.save();
    const savedUrl = '/videos/' + saved._id;
    res.redirect(savedUrl);
  }
});

router.get('/videos/create', async (req, res) => {
  res.render('videos/create');
});

router.get('/videos/:videoId', async (req, res) => {
  const video = await Video.findById(req.params.videoId);
  res.render('videos/show', {video});
});

router.get('/videos/:videoId/edit', async (req, res) => {
  const video = await Video.findById(req.params.videoId);
  res.render('videos/edit', {video});
});

router.post('/videos/:videoId/updates', (req, res) => {
  const {title, url, description} = req.body;
  Video.findByIdAndUpdate(
    req.params.videoId,
    req.body,
    {new: false, runValidators: true},
    async (err, doc) => {
      if (err) {
        const video = await Video.findById(req.params.videoId);
        err._id = video._id,
        err.title = title,
        err.url = url,
        err.description = description,
        res.status(400).render('videos/edit', {video: err});
      } else {
        const redirectUrl = '/videos/' + req.params.videoId;
        res.redirect(redirectUrl);
      }
    }
  );
});

router.post('/videos/:videoId/deletions', async (req, res) => {
  await Video.deleteOne({_id: req.params.videoId});
  res.redirect('/videos');
});

module.exports = router;
