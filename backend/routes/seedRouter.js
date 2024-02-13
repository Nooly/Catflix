import express from "express";
import expressAsyncHandler from "express-async-handler";
import seedData from "../controllers/seedController.js";

const seedRouter = express.Router();
seedRouter.get('/', expressAsyncHandler(seedData));

export default seedRouter;