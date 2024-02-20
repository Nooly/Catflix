import express from "express";
import expressAsyncHandler from "express-async-handler";
import seedData from "../controllers/seedController.js";
import { isAuth } from "../utils.js";

const seedRouter = express.Router();

seedRouter.use(isAuth);

seedRouter.get('/', expressAsyncHandler(seedData));

export default seedRouter;