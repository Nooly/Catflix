import jwt from "jsonwebtoken";

const generateToken = ({ _id/*,name*/, email }) => {
  return jwt.sign({ _id: _id/*,name: name*/, email: email }, process.env.JWT_PW, { expiresIn: '7d' }); //JWT_PW is in .env file
};


const isAuth = async (req, res, next) => {
  const auth = req.headers.authorization
  if (auth) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_PW, (err, decode) => {
      if (err) res.status(401).send({ message: "Welcome to the jungle" })
      else {
        req.user = decode;
        next()
      }
    });

  } else {
    res.status(401).send({ message: "Not authorized, no token" });
  }
};

const createItem = (title, contents) => { return [title, contents]; }
const filterContentByGenre = (contents, genre) => { return contents.filter((m) => m.genre == genre); };
const createCarouselItemGenre = (contents, genre, title) => { return createItem(title, filterContentByGenre(contents, genre)); }
const createCarouselItemAll = (contents, title) => { return createItem(title, contents); }
const getRandomContent = (contents) => { return contents[Math.floor(Math.random() * contents.length)] };


export { generateToken, isAuth, getRandomContent, createCarouselItemGenre, createCarouselItemAll }