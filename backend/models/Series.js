import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    imgTitle: { type: String, required: true },
    imgThumb: { type: String, required: true },
    imgVertical: { type: String, required: true },
    trailer: { type: String, required: true },
    episodes: { type: Array, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    limit: { type: String, required: true },
    genre: { type: String, required: true },
}, {
    timestamps: true
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;