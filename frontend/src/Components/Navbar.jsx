// Navbar.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, ButtonGroup, Dropdown, Image, Nav } from 'react-bootstrap';

import { React, useState, useEffect, Link, useNavigate, useContext } from '../imports.js';
import '../Styles/Navbar.css';
import { User } from '../User.jsx';
import { USER_SIGNOUT } from '../actions.jsx';

const Navbar = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;


    // State for storing scroll opacity
    const [scrollOpacity, setScrollOpacity] = useState(0.5);

    // Function to handle scroll events
    const handleScroll = () => {
        // Get the current vertical scroll position
        const scrollPosition = window.scrollY;

        // Calculate the maximum possible scroll value
        const maxScroll = document.body.scrollHeight - window.innerHeight;

        // Calculate opacity based on scroll position, scaling from 50% to 100%
        const opacity = 0.5 + (scrollPosition / maxScroll) * 0.5;

        // Update the scrollOpacity state with the calculated opacity
        setScrollOpacity(opacity);
    };

    // Effect hook to add and remove scroll event listener
    useEffect(() => {

        // Add scroll event listener when the component is mounted
        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove the scroll event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures the effect runs only on mount and unmount

    const signOutHandler = () => {
        ctxDispatch({ type: USER_SIGNOUT });
        localStorage.removeItem('userInfo');
        navigate("/signin");
    };

    return (
        <div className="navbar">
            <div className="background-layer" style={{ opacity: scrollOpacity }}></div>
            <div className="content">
                <div className="left-section">
                    <div className="logo-container navbar-item">
                        <Link to="/">
                            <img
                                src="/netflix_official_logo_icon_168085.png"
                                alt="Logo"
                                className="logo"
                                onClick={() => {

                                    // Handle logo click action
                                }}
                            />
                        </Link>
                    </div>
                    <div className="nav-links navbar-item">
                        <Link to="/"><span>Home</span></Link>
                        <Link to="/series"><span>Series</span></Link>
                        <Link to="/movies"><span>Movies</span></Link>
                        <Link to="/mylist"><span>My List</span></Link>
                    </div>
                </div>
                <div className="right-section">
                    <div className="search-bar navbar-item">
                        {/* Add your search bar component here */}
                        TEMP SEARCHBAR
                    </div>
                    <div className="icons navbar-item">
                        <div
                            className="bi bi-bell"
                            onClick={() => {
                                // Handle bell icon click action
                            }}
                        />
                        {/* Add your drop-down list component here */}
                        <ButtonGroup>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="right">
                                    {userInfo &&
                                        <Nav.Link href="#action">
                                            <Image className='profile-pic' src={userInfo.profilePicture} alt="Profile" />
                                            {userInfo.email}
                                        </Nav.Link>
                                    }
                                    <Nav.Link>
                                        <Button onClick={signOutHandler}>Sign Out</Button>
                                    </Nav.Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonGroup>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default Navbar;
