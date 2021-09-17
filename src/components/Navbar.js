import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import '../App.css';
import { signOut } from '../api/auth';



function Navbar() {
    const [button, setButton] = useState(true);
    const [click, setClick] = useState(false);

    //Reverses boolean value, to turn mobile hamburger menu on/off with each click
    const handleClick = () => setClick(!click);

    //Hook to close mobile menu
    const closeMobileMenu = () => setClick(false);

    const [render, setRender] = useState(false);


    //Show burger menu if window width <= 960px
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    
    window.addEventListener('load', showButton);
    window.addEventListener('resize', showButton);

    /* Store session token, set token to false, and 
    switch to true if bearerToken is not null and has many characters  */

    const bearerToken = localStorage.getItem('session_token')
    var token = false;
    
    if (bearerToken !== null && bearerToken.length > 40 ) {
            console.log(bearerToken);
        token = true;
        console.log(typeof bearerToken);
    } else {
        token = false;
        console.log(token);
    }
    
    //Show sign in/up buttons on mobile burger-meni
    const showSignInMobile = () => {
        if (window.innerWidth <= 960 && !token) {
            return <li className='nav-item'>
                        <Button link='/sign-in' buttonStyle='btn--outline' onClick={closeMobileMenu}>COACH SIGN IN</Button>
                        <Button link='/sign-up' buttonStyle='btn--outline' onClick={closeMobileMenu}>REGISTER COACH</Button>
                   </li>
            } else if (window.innerWidth <= 960 && !!token) {
            return <li>
                        <Button link='/sign-out' buttonStyle='btn--outline' onClick={() => {signOut(); setRender(true); closeMobileMenu()}}> SIGN OUT</Button>
                   </li>
            }
    }

    const showSignIn = () => {
        if (window.innerWidth > 960 && !token) {
            return <li className='nav-item'>
                        <Button link='/sign-in' buttonStyle='btn--coach' onClick={closeMobileMenu}>COACH SIGN IN</Button>
                        <Button link='/sign-up' buttonStyle='btn--coach' onClick={closeMobileMenu}>REGISTER COACH</Button>
                </li>
        } else if (window.innerWidth > 960 && !!token) {
            return <li>
                        <Button link='/sign-out' buttonStyle='btn--outline' onClick={() => {signOut(); setRender(true); closeMobileMenu()}}> SIGN OUT</Button>
                   </li>
        }
    }

    //Whenever screen is resized, showButton is called


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        FIGHT CLUB <i className='fas fa-bolt'/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times': 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/fighters' className='nav-links' onClick={closeMobileMenu}>
                                Boxers
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/schedule' className='nav-links' onClick={closeMobileMenu}>
                                Fight Schedule
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                                Contact Us
                            </Link>
                        </li>
                        {showSignInMobile()}
                        </ul>
                        </div>
                        <div className="btn-coach-nav">
                            {showSignIn()}
                        </div>
            </nav>
        </>
    );
}

export default Navbar;
