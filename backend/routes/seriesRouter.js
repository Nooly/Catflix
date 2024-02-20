import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {getSeriesByToken, getSerieses, getSeriesesByGenre} from '../controllers/seriesController.js';
import { isAuth } from '../utils.js';

const seriesesRouter = express.Router();

seriesesRouter.use(isAuth);

seriesesRouter.get('/', expressAsyncHandler(getSerieses));
seriesesRouter.get('/genre/:genre', expressAsyncHandler(getSeriesesByGenre));
seriesesRouter.get('/token/:token', expressAsyncHandler(getSeriesByToken));

export default seriesesRouter;