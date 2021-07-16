import React from 'react'
import { Button } from './Button';
import './MainSection.css';
import '../App.css';

function MainSection() {
    return (
        <div className='hero-container'>
            <h1>THE SWEET SCIENCE - Pierce Egan</h1> 
            <div className='hero-btns'>
                <Button 
                    className='btns'
                    buttonStyle='btn--outline'
                    buttonSize='btn--large'>
                        View the Scheduled Fights!
                </Button>
                <Button 
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'>
                        Are you a Coach? SIGN UP HERE!
                </Button>
            </div>
        </div>
    )
}

export default MainSection
