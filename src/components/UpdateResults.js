import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./NewFight.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UpdateResult() {
    const [boxers, setBoxers] = useState([]);
    const [boxerA, setBoxerA] = useState("");
    const [boxerB, setBoxerB] = useState("");
    const [timeScheduled, setTimeScheduled] = useState("");
    const [rounds, setRounds] = useState("");
    const [roundTime, setRoundTime] = useState("");
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [result, setResult] = useState("");
    const [results, setResults] = useState([]);
    const [gym, setGym] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);
    const history = useHistory();

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

    axios.patch("http://localhost:3001/fights", data).then((res) => {
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
      history.push("/fights/");
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/boxers/")
      .then((response) => {
        setBoxers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/gyms/")
      .then((response) => {
        setGyms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div style={{ maxWidth: 350 }}>
        {fights.map((data) => (
        <div className="fight-cards" key={data.id}>
          {boxers.map((boxer) => {
            if (boxer.id === data.boxer_a_id) {
              return (
                <div>
                  {boxer.first_name} {boxer.last_name}
                </div>
              );
            } else {
              return null;
            }
          })}
          <div>Vs</div>

          {boxers.map((boxer) => {
            if (boxer.id === data.boxer_b_id) {
              return (
                <div>
                  {boxer.first_name} {boxer.last_name}
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
      ))}

        <div className="form-group">
          <label htmlFor="timeScheduled" className="mt-2">
            Date Scheduled
          </label>
          <DatePicker
            id="time_scheduled"
            selected={timeScheduled}
            onChange={(date) => setTimeScheduled(date)}
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyy h:mm aa"
            showTimeInput
            timeIntervals={15}
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
          <input
            type="string"
            className="form-control"
            id="winner_id"
            placeholder="winner"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="string"
            className="form-control"
            id="loser_id"
            placeholder="loser"
            value={loser}
            onChange={(e) => setLoser(e.target.value)}
          />
        </div>

        <div className="form-group">
        <label htmlFor="result" className="mt-2">
            Match Result
          </label>
          <select
            className="form-control"
            id="result"
            placeholder="Result"
            onChange={(e) => setResult(e.target.value)}
            onSubmit={(e) => setResults(e.target.value)}
          >
            <option value="Please Select A Gym">'Please Select A Gym'</option>
            {results.map((result) => (
                <option key={result.value} value={result.id}>
                 {result.text}
                </option>
            ))}
            </select>
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

export default UpdateResults;
