import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true, min:1, max: 5},
    comment: {type: String, required: true},
    user: {
        type: ObjectId,
        ref: "user",
        required: true
    }
},{timestamps: true});

const movieShchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String},
    year: {type: Number, required: true},
    genre: {type: ObjectId, ref: "Genre", required: true},
    detail: {type: String, required: true},
    cast: [{type: String}],
    reviews: [reviewSchema],
    numReviews: {type: Number, required: true, default:0},
    createdAt: {type: Date, default: Date.now},

},{timeseries: true});

const MovieModel = mongoose.model('Movies', movieShchema);

export default MovieModel;