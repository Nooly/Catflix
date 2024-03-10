import { React, useState, useEffect, axios, useContext } from '../imports.js';
import '../Styles/Carousel.css';
import { User } from '../User.jsx';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid } from '@mui/material'
import CardPop from './CardPop.jsx';
import MyCard from './MyCard.jsx';

const DataCarousel = (props) => {

  // Function to group contents into arrays of three elements
  const groupItems = (items, groupSize) => {
    const grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  return (
    <div>      
      {props && props.data && props.data.length > 0 &&
        <div>
          <h1>{props.data[0]}</h1>
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
            {groupItems(props.data[1], 3).map((groupedItems, groupId) => (
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
      }
    </div>

  );
}
function Item(props) {
  return (
    <div className='Card-Caro'>
      <MyCard data={props.item}></MyCard>
    </div>

  )
}

export default DataCarousel;
