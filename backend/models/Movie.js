import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    imgTitle: { type: String, required: true },
    imgThumb: { type: String, required: true },
    imgVertical: { type: String, required: true },
    trailer: { type: String, required: true },
    movie: { type: String, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    limit: { type: String, required: true },
    genre: { type: String, required: true },
}, {
    timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;