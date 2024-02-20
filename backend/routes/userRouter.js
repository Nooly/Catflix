import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { signup, signin, checkAuth } from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.get('/check-auth', expressAsyncHandler(checkAuth));

usersRouter.post('/signup', expressAsyncHandler(signup));
usersRouter.post('/signin', expressAsyncHandler(signin));

export default usersRouter;