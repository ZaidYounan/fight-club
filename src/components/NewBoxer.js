import React, { useEffect, useState } from 'react';
import './NewBoxer.css'
import axios from 'axios';


function NewBoxer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [reach, setReach] = useState('');
    const [gym, setGym] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            firstName: firstName,
            lastName: lastName,
            height: height,
            weight: weight,
            reach: reach,
            gym: gym,
        }
        axios.post('http://localhost:3001/fighter/new', data).then(res =>{
            setData(res.data);
            setFirstName('');
            setLastName('');
            setHeight('');
            setWeight('');
            setReach('');
            setGym('');
            setLoading(false);
        })
    }


    return (
        <div className="container">
        <div style={{ maxWidth: 350 }}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="mt-2">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="height" className="mt-2">Height</label>
            <input
              type="number"
              className="form-control"
              id="height"
              placeholder="Height"
              value={height}
              onChange={e => setHeight(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="weight" className="mt-2">Weight</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              placeholder="Weight"
              value={weight}
              onChange={e => setWeight(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="reach" className="mt-2">Reach</label>
            <input
              type="number"
              className="form-control"
              id="reach"
              placeholder="Reach"
              value={reach}
              onChange={e => setReach(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="gym" className="mt-2">Gym</label>
            <input
              type="number"
              className="form-control"
              id="gym_id"
              placeholder="Gym ID"
              value={gym}
              onChange={e => setGym(e.target.value)} />
          </div>
          {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={loading}
          >{loading ? 'Loading...' : 'Submit'}</button>
          {data && <div className="mt-3">
            <strong>Output:</strong><br />
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          }
        </div>
      </div>
    )
}

export default NewBoxer
