import React from 'react'
import { Button } from './Button';
import './ScheduleView.css';

function ScheduleView () {

    const bearerToken = localStorage.getItem('session_token')

    var token = false;
    
    if (bearerToken !== null && bearerToken.length > 40 ) {
        console.log(bearerToken)
        token = true;
        console.log(typeof bearerToken);
    } else {
        token = false;
        console.log(token);
    }

    return (

        !!token ? (        
        <div className="schedule-container">
            <Button link='/schedule/new' buttonStyle='btn--schedule'>Click to Schedule A Fight</Button>
        </div>
        )
        : (<></>)
        

    )
}

export default ScheduleView;