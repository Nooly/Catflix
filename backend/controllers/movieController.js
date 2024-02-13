import Movie from "../models/Movie.js";

const getMovies = async (req, res) => {
    const movies = await Movie.find();
    res.send({ movies });
}

const getMoviesByGenre = async (req, res) => {
    const movies = await Movie.find();
    const moviesByGenre = movies.filter(m => m.genre === req.params.genre)
    if (moviesByGenre.length > 0) {
        res.send(moviesByGenre);
    } else {
        res.status(404).send({ message: "No movies found for this genre" });
    }
};



export { getMovies, getMoviesByGenre };