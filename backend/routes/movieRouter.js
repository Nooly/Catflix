import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { getMovies, getMoviesByGenre } from '../controllers/movieController.js';

const moviesRouter = express.Router();
moviesRouter.get('/', expressAsyncHandler(getMovies));
moviesRouter.get('/genre/:genre', expressAsyncHandler(getMoviesByGenre));

export default moviesRouter;