import Movie from "../models/Movie.js";
import Series from "../models/Series.js";
import { createCarouselItemGenre, getRandomContent } from "../utils.js";


const getHomePage = async (req, res) => {
    const movies = await Movie.find();
    const serieses = await Series.find();
    const contents = movies.concat(serieses);
    const homePage = [{ billboard: null }, { contents: [] }];
    homePage[0].billboard = getRandomContent(contents);
    homePage[1].contents.push(createCarouselItemGenre(contents, "Action", "Action Action Action"));
    homePage[1].contents.push(createCarouselItemGenre(contents, "Comedy", "HAHAHAHAHAHAHA"));
    homePage[1].contents.push(createCarouselItemGenre(contents, "Animation", "Animations"));
    res.send({ homePage });
};

const getContentByQuery = async (req, res) => {
    const { query } = req;
    // const page = query.page || 1;
    const page = 1; // replace with infinite scrolling later
    const searchQuery = query.q || "";
    const pageSize = query.pageSize || 6;
    // const pageSize = 2; // remove this later just for testing
    const queryFilter = searchQuery && searchQuery !== "all" ? {
        title: {
            $regex: searchQuery,
            $options: "i"
        }
    } : {}

    const movies = await Movie
        .find({ ...queryFilter })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    const countMovies = await Movie.countDocuments({ ...queryFilter });

    const serieses = await Series
        .find({ ...queryFilter })
        .skip(pageSize * (page - 1))
        .limit(pageSize);

    const countSerieses = await Series.countDocuments({ ...queryFilter });

    const contentCount = countMovies + countSerieses;

    const contents = movies.concat(serieses);

    res.send({ contents, contentCount, page, pages: Math.ceil(contentCount / pageSize) })


};

export { getHomePage, getContentByQuery };
