import Series from "../models/Series.js";

const getSerieses = async (req,res) => {
    const serieses = await Series.find();
    res.send({serieses});
}

export {getSerieses};