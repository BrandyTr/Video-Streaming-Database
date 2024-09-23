const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VideoSchema = Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    key: String,
    site: String, 
    published_at: Date,
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
