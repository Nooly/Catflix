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

const getMovieByToken = async (req, res) => {
    const movie = await Movie.findOne({ token: req.params.token });
    if (movie) res.send(movie)
    else res.status(404).send({ message: "Movie not found" });
};

const getMoviePage = async (req, res) => {
    const movies = await Movie.find();
    const moviesPage = [{ billboard: null }, { movies: [] }];
    moviesPage[0].billboard = getRandomMovie(movies)
    moviesPage[1].movies.push(createCarouselItemGenre(movies, "Action", "Action Movies"));
    moviesPage[1].movies.push(createCarouselItemGenre(movies, "Comedy", "Best movies to laugh"));
    res.send({ moviesPage });
};

const createItem = (title, movies) => { return [title, movies]; }

const filterMovieByGenre = (movies, genre) => { return movies.filter((m) => m.genre == genre); };
const createCarouselItemGenre = (movies, genre, title) => { return createItem(title, filterMovieByGenre(movies, genre)); }
const getRandomMovie = (movies) => { return movies[Math.floor(Math.random() * movies.length)] };

export { getMovies, getMoviesByGenre, getMovieByToken, getMoviePage };