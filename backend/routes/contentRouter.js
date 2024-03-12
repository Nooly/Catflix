import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { getContentByQuery, getHomePage } from '../controllers/contentController.js';
import { isAuth } from '../utils.js';

const contentsRouter = express.Router();

contentsRouter.use(isAuth);

contentsRouter.get('/', expressAsyncHandler(getHomePage));
contentsRouter.get('/search', expressAsyncHandler(getContentByQuery));

export default contentsRouter;