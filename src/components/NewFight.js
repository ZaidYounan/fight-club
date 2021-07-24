import React, { useState } from "react";
import "./NewFight.css";
import axios from "axios";

function NewFight() {
  const [boxerA, setBoxerA] = useState("");
  const [boxerB, setBoxerB] = useState("");
  const [rounds, setRounds] = useState("");
  const [timeScheduled, setTimeScheduled] = useState("");
  const [roundTime, setRoundTime] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [result, setResult] = useState("");
  const [gym, setGym] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      boxer_a_id: boxerA,
      boxer_b_id: boxerB,
      time_scheduled: timeScheduled,
      rounds: rounds,
      round_time: roundTime,
      winner_id: winner,
      loser_id: loser,
      result: result,
      gym_id: gym,
    };
    axios.post("http://localhost:3001/fights", data).then((res) => {
      setData(res.data);
      setBoxerA("");
      setBoxerB("");
      setTimeScheduled("");
      setRounds("");
      setRoundTime("");
      setWinner("");
      setLoser("");
      setResult("");
      setGym("");
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div style={{ maxWidth: 350 }}>
        <div className="form-group">
          <label htmlFor="boxerA" className="mt-2">
            Home Boxer
          </label>
          <input
            type="number"
            className="form-control"
            id="boxer_a_id"
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
            type="number"
            className="form-control"
            id="boxer_b_id"
            placeholder="Away Boxer"
            value={boxerB}
            onChange={(e) => setBoxerB(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeScheduled" className="mt-2">
            Time Scheduled
          </label>
          <input
            type="datetime"
            className="form-control"
            id="time_scheduled"
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
          <label htmlFor="roundTime" className="mt-2">
            Round Time
          </label>
          <input
            type="number"
            className="form-control"
            id="round_time"
            placeholder="RoundTime"
            value={roundTime}
            onChange={(e) => setRoundTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="winner" className="mt-2">
            Winner
          </label>
          <input
            type="number"
            className="form-control"
            id="winner_id"
            placeholder="winner"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="loser" className="mt-2">
            Loser
          </label>
          <input
            type="number"
            className="form-control"
            id="loser_id"
            placeholder="loser"
            value={loser}
            onChange={(e) => setLoser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="result" className="mt-2">
            Result
          </label>
          <input
            type="string"
            className="form-control"
            id="result"
            placeholder="Result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
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
