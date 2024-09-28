const Video = require("../models/video.model")

exports.createVideo=async (movieTitle, videoKey,site,type,published_at) => {
    const video = new Video({
      name: movieTitle,
      key: videoKey,
      site,
      type,
      published_at: new Date(published_at),
    });
    await video.save();
    return video;
  };