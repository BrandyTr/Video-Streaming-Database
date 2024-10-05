const mongoose = require('mongoose')
const Schema = mongoose.Schema
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
    ratings: {
        type: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User' },
                rate: { type: Number }
            }
        ],
        default: []
    },
    ratingSum: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    view: { type: Number, default: () => Math.floor(Math.random() * 100000) + 100 },
});
MovieSchema.virtual('averageRating').get(function () {
    if (this.ratingCount === 0) return 0;
    return (this.ratingSum / this.ratingCount).toFixed(1);
});
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
