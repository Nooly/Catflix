// Import the Express.js module for creating web applications
import express from "express";

// Import the CORS (Cross-Origin Resource Sharing) module to allow requests from different origins
import cors from "cors";

// Import the Mongoose module for MongoDB object modeling
import mongoose from "mongoose";

// Import the dotenv module to load environment variables from a .env file into process.env
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";

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

// Set the port for the server to listen on, either from the environment variable PORT or default to 8080
const PORT = process.env.PORT || 8080;

// Use the seedRouter for routes starting with "/api/v1/seed"
app.use("/api/v1/seed", seedRouter);

// Middleware for handling errors
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

// Connect to the MongoDB database using the connection string from the environment variables
mongoose.connect(process.env.MONGO_CONNECTION_STRING) //make sure that you have a .env file
.then(() => {
    // Start the server and listen on the specified port
    app.listen(PORT, function(){
        console.log("listening on " + PORT);
    })
}).catch(err => {console.log(err.message);}); // Log any errors during the connection
