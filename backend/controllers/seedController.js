import {data} from "../data.js";
import Content from '../models/Content.js';
import User from '../models/User.js';


const seedData = async (req, res) => {
    await User.deleteMany();
    await Content.deleteMany();

    const users = await User.insertMany(data.users);
    const contents = await Content.insertMany(data.content);
    res.send({ users, contents });
};

export default seedData;