import React, { useEffect, useState } from 'react';
import './BoxerView.css';
import axios from 'axios';
import { Button } from './Button';
import avatarimg from '../images/avatarimg.jpeg'
import { API_URL } from '../api/auth';

function BoxerView() {
    const [boxers, setBoxers] = useState([]);
    const [gyms, setGyms] = useState([]);
    

    /* Authentication token storing to perform a check on whether to 
    display the New Fighter button */
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

    /* Get the Boxers and Gyms data both, so that gyms 
    can be presented with the gym name rather than just 
    the gym id */ 
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

    console.log(boxers);

    var loadedBoxers = false;


    if (boxers.length > 0) {
        loadedBoxers = true;
    } else {
        loadedBoxers = false;
    }

    return (
        !!loadedBoxers ? (
            <div className="boxer-container">
                {boxers.map((data) => (
                    <div className="boxer-cards" key={data.id}> 
                        <img src={avatarimg} width={300} height={300}/>
                        <td>Name: {data.first_name} {data.last_name}</td>           
                        <td>Height: {data.height} cm</td>
                        <td>Weight: {data.weight} kg</td>
                        <td>Reach: {data.reach } inches</td>
                            { gyms.map((gym) => {
                                if (gym.id === data.gym_id) {
                                    return <div>Gym: {gym.name} <p>{gym.address}</p></div>
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
