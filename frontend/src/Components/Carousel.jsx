import { React, useState, useEffect, Link } from '../imports.js';
import { Carousel } from 'react-carousel';
import 'react-carousel/lib/react-carousel.css';
import '../Styles/Carousel.css';

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { moviesData } = await axios.get(`/api/v1/movies/token/The Dark Knight`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}`, },
        });
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies data:', error);
      }

    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movie Carousel</h1>
      <Carousel>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            {/* Add more details or customize as needed */}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Carousel;
