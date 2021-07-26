import React, { useEffect, useState } from "react";
import "./ScheduleView.css";
import axios from "axios";
import { Button } from "./Button";
import { API_URL } from "../api/auth";
import {Link} from "react-router-dom";

function ScheduleView() {
  const [fights, setFights] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [boxers, setBoxers] = useState([]);
  const bearerToken = localStorage.getItem("session_token");

  var token = false;

  if (bearerToken !== null && bearerToken.length > 40) {
    console.log(bearerToken);
    token = true;
    console.log(typeof bearerToken);
  } else {
    token = false;
    console.log(token);
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/fights`)
      .then((response) => {
        setFights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      .get(`${API_URL}/gyms`)
      .then((response) => {
        setGyms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return fights ? (
    <div className="fight-container">
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

          <div>
             Scheduled Date: {data.time_scheduled}
          </div>

          {gyms.map((gym) => {
            if (gym.id === data.gym_id) {
              return <div>@{gym.name}</div>;
            } else {
              return null;
            }
          })}

        <div>
        {((boxer) => {
            if (boxer.id === data.winner_id) {
              return (
                <div>
                  Winner: {boxer.first_name} {boxer.last_name}
                </div>
              );
            } else {
              return (
              <Link to={"/schedule/" + data.id}>Update Results</Link>
        )}
          })}
        </div>

        </div>
      ))}
      {!!token ? (
        <Button link="/schedule/new" buttonStyle="btn--schedule">
          Schedule a New Fight
        </Button>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div>Loading Schedule</div>
  );
}

export default ScheduleView;
