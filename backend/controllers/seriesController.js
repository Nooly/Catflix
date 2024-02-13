import Series from "../models/Series.js";

const getSerieses = async (req, res) => {
    const serieses = await Series.find();
    res.send({ serieses });
}

const getSeriesesByGenre = async (req, res) => {
    const serieses = await Series.find();
    const seriesesByGenre = serieses.filter(s => s.genre === req.params.genre)
    if (seriesesByGenre.length > 0) {
        res.send(seriesesByGenre);
    } else {
        res.status(404).send({ message: "No serieses found for this genre" });
    }
};

const getSeriesByToken = async (req, res) => {
    const series = await Series.findOne({ token: req.params.token });
    if (series) res.send(series)
    else res.status(404).send({ message: "Series not found" });
}

export { getSerieses, getSeriesesByGenre, getSeriesByToken };