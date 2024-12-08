const mongoose = require('mongoose')
const Schema = mongoose.Schema
const opts = { toJSON: { virtuals: true } }
const MovieSchema = new Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: Date, required: true },
    runtime: { type: Number, required: true },
    poster_path: { type: String, required: true },
    backdrop_path: { type: String, required: true },
    credit: { type: Schema.Types.ObjectId, ref: 'Credit' },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video', default: [] }],
    favoriteCount: { type: Number, default: 0 },
    ratingSum: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    isPublished:{
        type:Boolean,
        default:false
    },
    view: { type: Number, default: () => Math.floor(Math.random() * 100000) + 100 },
},opts);
MovieSchema.virtual('averageRating').get(function () {
    if (this.ratingCount === 0) return 0;
    return parseFloat((this.ratingSum / this.ratingCount).toFixed(1));
});
MovieSchema.virtual('popularity').get(function(){
    return 0.5 * this.view + 0.4 * parseFloat(this.averageRating) + 0.1 * this.favoriteCount;
})
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
