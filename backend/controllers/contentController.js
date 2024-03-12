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
    res.send({homePage});
};

export { getHomePage };
