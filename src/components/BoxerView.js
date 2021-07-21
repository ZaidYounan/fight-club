import React, { useEffect, useState } from 'react';
import './BoxerView.css';
import axios from 'axios';
import { Button } from './Button';

function BoxerView() {
    const [boxers, setBoxers] = useState([]);
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/boxers/')
            .then(response => {
                setBoxers(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/gyms/')
            .then(response => {
                setGyms(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        boxers ? (
            <div className="boxer-container">
                {boxers.map((data) => (
                    <div className="boxer-cards" key={data.id}> 
                        <td>Name: {data.first_name} {data.last_name}</td>           
                        <td>Height: {data.height}cm</td>
                        <td>Weight: {data.weight}kg</td>
                            { gyms.map((gym) => {
                                if (gym.id === data.gym_id) {
                                    return <div>Gym: {gym.name}</div>
                                } else {
                                return null
                            }
                        })}
                    </div>
                ))}
                <Button link='/fighters/new' buttonStyle='btn--schedule'>Add A New Fighter</Button>
            </div>
        ) : ( 
            <div>Loading Boxers</div> 
        )
    );
}



export default BoxerView;
