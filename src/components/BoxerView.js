import React, { useEffect, useState } from 'react';
import './BoxerView.css';
import axios from 'axios';

function BoxerView() {
    const [boxers, setBoxers] = useState([]);
    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/boxers/')
            .then(response => {
                setBoxers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/gyms/')
            .then(response => {
                setGyms(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);



    return (
        boxers ? (
            <>
                {boxers.map((data) => (
                    <div className="boxer-container"> 
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
            </>
    ) : ( 
        <div>Loading Boxers</div> 
        )
    );
}



export default BoxerView;
