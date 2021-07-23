import { useState } from "react";
import React from "react";
import "./NewFight.css";
import axios from "axios";

function NewFight() {
  const [boxerA, setBoxerA] = useState("");
  const [boxerB, setBoxerB] = useState("");
  const [user, setUser] = useState("");
  const [timeScheduled, setTimeScheduled] = useState("");
  const [rounds, setRounds] = useState("");
  const [gym, setGym] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      boxer_a: boxerA,
      boxer_b: boxerB,
      user_id: user,
      time_scheduled: timeScheduled,
      rounds: rounds,
      gym_id: gym,
    };
    axios.post("http://localhost:3001/fights", data).then((res) => {
      setData(res.data);
      setBoxerA("");
      setBoxerB("");
      setCoach("");
      setTimeScheduled("");
      setRounds("");
      setGym("");
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div style={{ maxWidth: 350 }}>
        <div className="form-group">
          <label htmlFor="boxerA">Home Boxer</label>
          <input
            type="text"
            className="form-control"
            id="boxer_a"
            placeholder="Home Boxer"
            value={boxerA}
            onChange={(e) => setBoxerA(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boxerB" className="mt-2">
            Away Boxer
          </label>
          <input
            type="text"
            className="form-control"
            id="boxer_b"
            placeholder="Away Boxer"
            value={boxerB}
            onChange={(e) => setBoxerB(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user" className="mt-2">
            Coach
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            placeholder="Coach"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeScheduled" className="mt-2">
            Time Scheduled
          </label>
          <input
            type="number"
            className="form-control"
            id="timeScheduled"
            placeholder="Time Scheduled"
            value={timeScheduled}
            onChange={(e) => setTimeScheduled(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rounds" className="mt-2">
            Rounds
          </label>
          <input
            type="number"
            className="form-control"
            id="rounds"
            placeholder="Rounds"
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gym" className="mt-2">
            Gym
          </label>
          <input
            type="number"
            className="form-control"
            id="gym_id"
            placeholder="Gym ID"
            value={gym}
            onChange={(e) => setGym(e.target.value)}
          />
        </div>
        {isError && (
          <small className="mt-3 d-inline-block text-danger">
            Something went wrong. Please try again later.
          </small>
        )}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        {data && (
          <div className="mt-3">
            <strong>Output:</strong>
            <br />
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewFight;
