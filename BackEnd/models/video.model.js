const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VideoSchema = Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    key: String,  // e.g., YouTube video key
    site: String,  // e.g., "YouTube"
    type: String,  // e.g., "Trailer"
    official: Boolean,
    published_at: Date,
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
