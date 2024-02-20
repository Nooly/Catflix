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

export { checkAuth, signup, signin };