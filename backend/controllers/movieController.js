import Movie from "../models/Movie.js";
import Series from "../models/Series.js";
import { createCarouselItemGenre, getRandomContent } from "../utils.js";

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

const getMovieByToken = async (req, res) => {
    const movie = await Movie.findOne({ token: req.params.token });
    if (movie) res.send(movie)
    else res.status(404).send({ message: "Movie not found" });
};

const getMoviePage = async (req, res) => {
    const movies = await Movie.find();
    const moviesPage = [{ billboard: null }, { movies: [] }];
    moviesPage[0].billboard = getRandomContent(movies)
    moviesPage[1].movies.push(createCarouselItemGenre(movies, "Action", "Action Movies"));
    moviesPage[1].movies.push(createCarouselItemGenre(movies, "Comedy", "Best movies to laugh"));
    res.send({ moviesPage });
};

// Need to move this somewhere else, for now will stay here for testing and stuff
const getHomePage = async (req, res) => {
    const movies = await Movie.find();
    const serieses = await Series.find();
    const contents = movies.concat(serieses);
    const homePage = [{ billboard: null }, { contents: [] }];
    homePage[0].billboard = getRandomContent(contents);
    homePage[1].movies.push(createCarouselItemGenre(movies, "Action", "Action Action Action"));
    homePage[1].movies.push(createCarouselItemGenre(movies, "Comedy", "HAHAHAHAHAHAHA"));
    homePage[1].movies.push(createCarouselItemGenre(movies, "Animation", "Animations"));
    res.send(contents);
};

export { getMovies, getMoviesByGenre, getMovieByToken, getMoviePage, getHomePage };
