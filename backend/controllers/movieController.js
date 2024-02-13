import Movie from "../models/Movie.js";

const getMovies = async (req,res) => {
    const movies = await Movie.find();
    res.send({movies});
}

export default getMovies;