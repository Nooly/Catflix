import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { getMovieByToken, getMovies, getMoviesByGenre, getMoviePage } from '../controllers/movieController.js';
import { isAuth } from '../utils.js';

const moviesRouter = express.Router();

moviesRouter.use(isAuth);

moviesRouter.get('/', expressAsyncHandler(getMoviePage));

moviesRouter.get('/genre/:genre', expressAsyncHandler(getMoviesByGenre));
moviesRouter.get('/token/:token', expressAsyncHandler(getMovieByToken));

export default moviesRouter;