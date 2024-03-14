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
          <h1 className='text-white'>{props.data[0]}</h1>
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
            {groupItems(props.data[1], 6).map((groupedItems, groupId) => (
              // <Grid container spacing={2} key={groupId}>
              <Grid container key={groupId}>
                <div className='flex-container-caro'>

              {groupedItems.map((content, index) => (
                  // <Grid item xs={4} key={itemIndex}>
                  // <div className='flex-container-caro'>
                    // <Item key={itemIndex} item={item} />
                    <MyCard className='carosel-card' data={content} key={index} ></MyCard>
                  // </div>
                  // </Grid>
                ))}
                </div>
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
    // <div className='Card-Caro'>
      <MyCard data={props.item}></MyCard>
    // </div>

  )
}

export default DataCarousel;
