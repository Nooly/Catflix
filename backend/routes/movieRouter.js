import express from 'express';
import expressAsyncHandler from "express-async-handler";
import  getMovies  from '../controllers/movieController.js';

const moviesRouter = express.Router();
moviesRouter.get('/', expressAsyncHandler(getMovies));

export default moviesRouter;