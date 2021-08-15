import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./UpdateResults.css";
import axios from "axios";
import { API_URL } from "../api/auth";

function UpdateResults({ id }) {
  const [rounds, setRounds] = useState("");
  const [roundTime, setRoundTime] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [result, setResult] = useState("");
  const [boxers, setBoxers] = useState([]);
  const [fight, setFight] = useState([]);
  const [setBoxerW] = useState([]);
  const [setBoxerL] = useState([]);
  const [setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data] = useState(null);
  const history = useHistory();

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);

    //Object to store data
    const data = {
      rounds: rounds,
      round_time: roundTime,
      winner_id: winner,
      loser_id: loser,
      result: result,
    };

    //Patch data with updates
    axios.patch(`${API_URL}/fights/${id}`, data).then((res) => {
      setRounds("");
      setRoundTime("");
      setWinner("");
      setLoser("");
      setResult("");
      setLoading(false);
      history.push("/schedule");
    });
  };

  //Array to store possible Results drop-down box options
  const resultsArr = [
    { value: 'Draw', text: 'Draw' },
    { value: 'majority decision', text: 'Majority Decision' },
    { value: 'KO', text: 'KO' },
    { value: 'TKO', text: 'TKO' },
    { value: 'ND', text: 'ND' },
    { value: 'DQ', text: 'DQ' }
  ];

  //Get boxers data
  useEffect(() => {

    axios
      .get(`${API_URL}/boxers`)
      .then((response) => {
        setBoxers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {

    axios
      .get(`${API_URL}/fights/${id}`)
      .then((response) => {
        setFight(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);







  return (
    <div className="container">

      <div style={{ maxWidth: 350 }}>

        <h1>Match Results</h1>
        <br></br>
        <div className="form-group">
          <label htmlFor="rounds" className="mt-2">
            Rounds Total
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
            Time into Round
          </label>
          <input
            type="number"
            className="form-control"
            id="round_time"
            placeholder="Minutes"
            value={roundTime}
            onChange={(e) => setRoundTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="winner" className="mt-2">
            Winner of Match
          </label>
          <select
            className="form-control"
            id="winner_id"
            placeholder="Winner"
            onChange={(e) => setWinner(e.target.value)}
            onSubmit={(e) => setBoxerW(e.target.value)}
          >
            {fight ? (
              <>
              <option value="Winner">Please Select Winner</option>
              <option key={fight.value} value={fight.boxer_a_id}>
                  {fight.boxer_a_id} - 
                  {boxers.map((boxer) => {
                    if (boxer.id === fight.boxer_a_id) {
                      return ' ' + boxer.first_name + ' ' + boxer.last_name

                        } else {
                          return null
                        }})}
              </option>
              <option key={fight.value} value={fight.boxer_b_id}>
                  {fight.boxer_b_id} - 
                  {boxers.map((boxer) => {
                    if (boxer.id === fight.boxer_b_id) {
                      return ' ' + boxer.first_name + ' ' + boxer.last_name

                        } else {
                          return null
                        }})}
              </option>
            </>
            ) : (<div></div>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loser" className="mt-2">
            Loser of Match
          </label>
          <select
            className="form-control"
            id="loser_id"
            placeholder="Winner"
            onChange={(e) => setLoser(e.target.value)}
            onSubmit={(e) => setBoxerL(e.target.value)}
          >
            {fight ? (
              <>
                <option value="loser">Please Select Loser</option>
                <option key={fight.value} value={fight.boxer_a_id}>
                    {fight.boxer_a_id} - 
                    {boxers.map((boxer) => {
                      if (boxer.id === fight.boxer_a_id) {
                        return ' ' + boxer.first_name + ' ' + boxer.last_name

                          } else {
                            return null
                          }})}
                </option>
                <option key={fight.value} value={fight.boxer_b_id}>
                    {fight.boxer_b_id} - 
                    {boxers.map((boxer) => {
                      if (boxer.id === fight.boxer_b_id) {
                        return ' ' + boxer.first_name + ' ' + boxer.last_name

                          } else {
                            return null
                          }})}
                </option>
              </>
            ) : (<div></div>)}
          </select>
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
            {resultsArr.map((result) => (
              <option key={result.value} value={result.value}>
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
