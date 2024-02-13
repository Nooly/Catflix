import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";
import usersRouter from "./routes/userRouter.js";
import moviesRouter from "./routes/movieRouter.js";
import seriesesRouter from "./routes/seriesRouter.js";

// Create an instance of an Express application
const app = express();

// Load the environment variables from your .env file and store them in process.env
dotenv.config();

// Add the CORS middleware to the Express application to allow the server to respond to requests from different origins
app.use(cors());

// Add a middleware to the Express application that parses incoming requests with JSON payloads
app.use(express.json());

// Add a middleware to the Express application that parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/movies", moviesRouter)
app.use("/api/v1/serieses", seriesesRouter)

// Middleware for handling errors
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

// Connect to the MongoDB database using the connection string from the environment variables
mongoose.connect(process.env.MONGO_CONNECTION_STRING) //make sure that you have a .env file
    .then(() => {
        // Start the server and listen on the specified port
        app.listen(PORT, function () {
            console.log("listening on " + PORT);
        })
    }).catch(err => { console.log(err.message); }); // Log any errors during the connection
