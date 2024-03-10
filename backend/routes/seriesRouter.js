import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {getSeriesByToken, getSeriesPage, getSeriesesByGenre} from '../controllers/seriesController.js';
import { isAuth } from '../utils.js';

const seriesesRouter = express.Router();

seriesesRouter.use(isAuth);

seriesesRouter.get('/', expressAsyncHandler(getSeriesPage));
seriesesRouter.get('/genre/:genre', expressAsyncHandler(getSeriesesByGenre));
seriesesRouter.get('/token/:token', expressAsyncHandler(getSeriesByToken));

export default seriesesRouter;