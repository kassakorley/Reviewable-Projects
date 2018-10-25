const {mongoose} = require('../database.js');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    url: {
      type: String,
      required: [true, 'A URL is required']
    },
    description: {
      type: String
    }
  })
);

module.exports = Video;
