import User from '../models/User.js';
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res) => {
    const auth = req.headers.authorization

    if (auth) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            jwt.verify(token, process.env.JWT_PW, (err, decode) => {
                if (err) res.status(401).send({ authenticated: false })
                else {
                    req.user = decode;
                    res.status(200).send({ authenticated: true });
                }
            });
        } catch (error) {
            console.log(error.message)
        }
    } else {
        res.status(401).send({ message: "Not authorized, no token" });
    }
};

const signup = async (req, res) => {
    const { email, password } = req.body;

    const newUser = new User({
        // name: name,
        email: email,
        password: bcrypt.hashSync(password)
    });


    const user = await newUser.save();

    // we don't need the password
    res.send({
        _id: user._id,
        // name: user.name,
        email: user.email,
        token: generateToken(user)
    })
}

const signin = async (req, res) => {
    const { password: passwordFromWebsite, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        if (bcrypt.compareSync(passwordFromWebsite, user.password)) {
            res.send({
                _id: user._id,
                // name: user.name,
                email: user.email,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid User/Password" });
}

const addToMyList = async (req, res) => {
    try {
        const user = await User.findOne({ token: req.params.token });

        if (user) {
            const { movie } = req.body;

            // Assuming the movie is an object with details
            if (movie) {
                // Check if the movie is already in the myList array
                const isMovieAlreadyAdded = user.myList.some((m) => m.id === movie.id);

                if (!isMovieAlreadyAdded) {
                    // If the movie is not already added, push it to the myList array
                    user.myList.push(movie);
                    await user.save();
                    res.status(200).send({ message: "Movie added to myList successfully" });
                } else {
                    res.status(400).send({ message: "Movie already exists in myList" });
                }
            } else {
                res.status(400).send({ message: "Invalid movie details in the request body" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding movie to myList:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const removeFromMyList = async (req, res) => {
    try {
        const user = await User.findOne({ token: req.params.token });

        if (user) {
            const { movie } = req.body;

            // Assuming the movie is an object with details
            if (movie) {
                // Find the index of the movie in the myList array
                const index = user.myList.findIndex((m) => m.id === movie.id);

                if (index !== -1) {
                    // Remove the movie from the myList array
                    user.myList.splice(index, 1);
                    await user.save();
                    res.status(200).send({ message: "Movie removed from myList successfully" });
                } else {
                    res.status(404).send({ message: "Movie not found in myList" });
                }
            } else {
                res.status(400).send({ message: "Invalid movie details in the request body" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error removing movie from myList:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getMyList = async (req, res) => {
    const user = await User.findOne({ token: req.params.token });
    if (user) res.send(user.myList);
    else res.status(404).send({ message: "User not found" });
};

export { checkAuth, signup, signin, addToMyList, removeFromMyList, getMyList };