import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { getHomePage } from '../controllers/contentController.js';
import { isAuth } from '../utils.js';

const contentsRouter = express.Router();

contentsRouter.use(isAuth);

contentsRouter.get('/', expressAsyncHandler(getHomePage));

export default contentsRouter;