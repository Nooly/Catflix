import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {getSerieses} from '../controllers/seriesController.js';

const seriesesRouter = express.Router();
seriesesRouter.get('/', expressAsyncHandler(getSerieses));

export default seriesesRouter;