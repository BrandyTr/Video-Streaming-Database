const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VideoSchema = Schema({
    name: { type: String, required: true },
    key: { type: String, required: true },
    site: { type: String, default:"Youtube" }, 
    type:{type:String,default:"full-time"},
    published_at: {type:Date,required:true},
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
