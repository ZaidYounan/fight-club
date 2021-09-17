import React from 'react'
import { Button } from './Button';
import './MainSection.css';
import '../App.css';
import { useState } from 'react'; 
import { getToken } from '../api/auth';


function MainSection() {

    const [token, setToken] = useState(getToken());
    const signedIn = !!token

    //If logged out, show the sign up button, otherwise hidden
    const showRegister = () => {
        if (!signedIn) {
            return <Button 
                        className='btns'
                        buttonStyle='btn--view'
                        buttonSize='btn--large'>
                            Are you a Coach? SIGN UP HERE!
                   </Button>
            }
    }

    return (
        <div className='hero-container'>
            <h1>THE SWEET SCIENCE</h1> 
            <div className='hero-btns'>
                <Button 
                    link='/schedule'
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'>
                        View the Scheduled Fights
                </Button>
                {showRegister()}
            </div>
        </div>
    )
}

export default MainSection
