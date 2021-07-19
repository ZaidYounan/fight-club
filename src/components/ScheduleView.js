import React from 'react'
import { Button } from './Button';
import './ScheduleView.css';

function ScheduleView () {


    return (
        <div className="schedule-container">
            <Button link='/schedule/new' buttonStyle='btn--schedule'>Click to Schedule A Fight</Button>
        </div>
    )
}

export default ScheduleView;