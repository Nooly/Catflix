import { React, useState, useEffect, axios, useContext } from '../imports.js';
import '../Styles/Carousel.css';
import { User } from '../User.jsx';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid } from '@mui/material'
import CardPop from './CardPop.jsx';
import MyCard from './MyCard.jsx';

const DataCarousel = () => {

  const [movies, setMovies] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(User);
  const { userInfo } = state;

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/v1/movies`, {
          headers: { 'Authorization': `Bearer ${userInfo.token}` },
        });
        setMovies(data.movies);
      } catch (error) {
        console.error('Error fetching movies data:', error);
      }
    };
    getData();
  }, []);


  // Function to group movies into arrays of three elements
  const groupItems = (items, groupSize) => {
    const grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  return (
    <div>
      <Carousel className="carousel-container"
        autoPlay={false}
        animation="slide"
        duration={700}
        navButtonsAlwaysVisible={true}
        stopAutoPlayOnHover={true}
        cycleNavigation={true}
        fullHeightHover={true}
        indicators={false}
      >
        {groupItems(movies, 3).map((groupedItems, groupId) => (
          <Grid container spacing={2} key={groupId}>
            {groupedItems.map((item, itemIndex) => (
              <Grid item xs={4} key={itemIndex}>
                <Item key={itemIndex} item={item} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </div>
  );
}
function Item(props) {
  const Meow = () => {
    console.log(props.item.title)
  }
  return (
    <div>
      <MyCard data={props.item}></MyCard>
    </div>

  )
}

export default DataCarousel;
