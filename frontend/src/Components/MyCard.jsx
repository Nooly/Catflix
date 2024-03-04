import { React, useState, useEffect, axios, useContext, PropTypes } from '../imports.js';
import CardPop from './CardPop.jsx';
import '../Styles/Card.css'
const MyCard = (props) => {
    // console.log(props);
    // console.log(props.data.title);
    // const { data } = props.data;
    // console.log(data.title)
    // // console.log(data)
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isHovered ?
                <img className='thumb' src={props.data.imgThumb} alt={props.data.title} />
                :
                <CardPop data={props.data}></CardPop>
            }

        </div>
    )
}

export default MyCard;