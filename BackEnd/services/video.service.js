const Video = require("../models/video.model")

exports.createVideo=async (movieTitle, videoKey,published_at) => {
    const video = new Video({
      name: movieTitle,
      key: videoKey,
      site: "YouTube",
      published_at: new Date(published_at),
    });
    await video.save();
    return video._id;
  };