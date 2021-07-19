import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const showCoach = () => {
    if (window.innerWidth <= 960) {
        return <li className='nav-item'>
            <Button link='/sign-in' buttonStyle='btn--outline'>COACH SIGN IN</Button>
        </li>
        }
        
    }

    useEffect(() => {
        showButton();
    }, []);

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
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
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
                        {showCoach()}
                    </ul>
                    {button && <Button link='/sign-in' buttonStyle='btn--outline'>COACH SIGN IN</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
