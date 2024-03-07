import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { signup, signin, checkAuth, getMyList, addToMyList, removeFromMyList } from '../controllers/userController.js';
import { isAuth } from '../utils.js';

const usersRouter = express.Router();

usersRouter.get('/check-auth', expressAsyncHandler(checkAuth));
usersRouter.post('/signup', expressAsyncHandler(signup));
usersRouter.post('/signin', expressAsyncHandler(signin));

usersRouter.use(isAuth);

usersRouter.get('/user-my-list', expressAsyncHandler(getMyList));
usersRouter.post('/user-my-list-add', expressAsyncHandler(addToMyList));
usersRouter.post('/user-my-list-remove', expressAsyncHandler(removeFromMyList));


export default usersRouter;