import React, { useEffect, useState } from 'react';
import './BoxerView.css';
import axios from 'axios';
import { Button } from './Button';
import avatarimg from '../images/avatarimg.jpeg'
import { API_URL } from '../api/auth';

function BoxerView() {
    const [boxers, setBoxers] = useState([]);
    const [gyms, setGyms] = useState([]);
    
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

    useEffect(() => {
        axios.get(`${API_URL}/boxers`)
            .then(response => {
                setBoxers(response.data);
            })
            .catch(error => {
                console.log(error)
            })

            axios.get(`${API_URL}/gyms`)
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
                        <img src={avatarimg} width={300} height={300}/>
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
                {!!token ? (<Button link='/fighters/new' buttonStyle='btn--schedule'>
                    Add A New Fighter
                    </Button>)
                    : (<></>)
                    }
            </div>
        ) : ( 
            <div>Loading Boxers</div> 
        )
    );
}



export default BoxerView;
