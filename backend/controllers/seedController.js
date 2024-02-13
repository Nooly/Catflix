import { data } from "../data.js";
import Movie from "../models/Movie.js";
import Series from "../models/Series.js";
import User from '../models/User.js';

const seedData = async (req, res) => {
    await User.deleteMany();
    await Movie.deleteMany();
    await Series.deleteMany();

    const users = await User.insertMany(data.users);
    const movies = await Movie.insertMany(data.movies);
    const serieses = await Series.insertMany(data.serieses);

    res.send({ users, movies, serieses });
};

export default seedData;