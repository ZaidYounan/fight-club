import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import '../App.css';
import { signOut } from '../api/auth';



function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const [render, setRender] = useState(false);



    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };


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
 
    const showSignIn = () => {
        if (window.innerWidth <= 960 && !token) {
            return <li className='nav-item'>
                        <Button link='/sign-in' buttonStyle='btn--outline'>COACH SIGN IN</Button>
                        <Button link='/sign-up' buttonStyle='btn--outline'>REGISTER COACH</Button>
                </li>
            }
    }

    window.addEventListener('resize', showButton);

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
                        {showSignIn()}
                        </ul>
                        </div>
                        <div className="btn-coach-nav">
                        {!!token ? (
                                    button && 
                                        <Button link='/sign-out' buttonStyle='btn--outline' 
                                    onClick={() => {signOut(); setRender(true);}}> SIGN OUT</Button>
                                 ): button && <Button link='/sign-in' buttonStyle='btn--coach'>COACH SIGN IN</Button>}
                                {!token ? (button && <Button link='/sign-up' buttonStyle='btn--coach'>REGISTER COACH</Button>) : (<></>) }
                        </div>
            </nav>
        </>
    );
}

export default Navbar;
