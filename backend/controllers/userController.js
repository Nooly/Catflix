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
    const { email, password, myList } = req.body;

    const newUser = new User({
        // name: name,
        email: email,
        password: bcrypt.hashSync(password),
        myList: myList
    });


    const user = await newUser.save();

    // we don't need the password
    res.send({
        _id: user._id,
        // name: user.name,
        email: user.email,
        token: generateToken(user),
        myList: user.myList,
        profilePicture: user.profilePicture
    })
}

const signin = async (req, res) => {
    const { password: passwordFromWebsite, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
        console.log(user)
        if (bcrypt.compareSync(passwordFromWebsite, user.password)) {
            res.send({
                _id: user._id,
                // name: user.name,
                email: user.email,
                token: generateToken(user),
                myList: user.myList,
                profilePicture: user.profilePicture
            })
            return;
        }
    }
    res.status(401).send({ message: "Invalid User/Password" });
}

const addToMyList = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const { content } = req.body;
            // Assuming the content is an object with details
            if (content) {
                // Check if the content is already in the myList array
                const isContentAlreadyAdded = user.myList.some((c) => c._id === content._id);
                if (!isContentAlreadyAdded) {
                    // If the content is not already added, push it to the myList array
                    user.myList.push(content);
                    await user.save();
                    res.status(200).send({ message: "Content added to myList successfully" });
                } else {
                    res.status(400).send({ message: "Content already exists in myList" });
                }
            } else {
                res.status(400).send({ message: "Invalid content details in the request body" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding content to myList:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const removeFromMyList = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const { content } = req.body;

            // Assuming the content is an object with details
            if (content) {
                // Find the index of the content in the myList array
                const index = user.myList.findIndex((c) => c._id === content._id);

                if (index !== -1) {
                    // Remove the content from the myList array
                    user.myList.splice(index, 1);
                    await user.save();
                    res.status(200).send({ message: "Content removed from myList successfully" });
                } else {
                    res.status(404).send({ message: "Content not found in myList" });
                }
            } else {
                res.status(400).send({ message: "Invalid content details in the request body" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error removing content from myList:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const getMyList = async (req, res) => {
    const { email } = req.query; // Use 'req.query' to access query parameters
    const user = await User.findOne({ email: email });

    if (user) res.send(user.myList);
    else res.status(404).send({ message: "User not found" });
};

export { checkAuth, signup, signin, addToMyList, removeFromMyList, getMyList };