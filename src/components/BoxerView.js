import React, { useEffect, useState } from 'react';
import './BoxerView.css';
import axios from 'axios';

function BoxerView() {
    const [boxers, setBoxers] = useState([]);

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

    return (
        boxers ? (
        <>
            <>
                {boxers.map((data) => (
                    <div class="boxer-container"> 
                        <td>Name: {data.first_name} {data.last_name}</td>           
                        <td>Height: {data.height}cm</td>
                        <td>Weight: {data.weight}kg</td>
                        <td>Gym ID: {data.gym_id}</td>
                    </div>
                ))}
            </>
        </>
    ) : ( 
        <div>Loading Boxers</div> 
        )
    );
}

export default BoxerView;
