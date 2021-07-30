import React, { useEffect, useState } from "react";
import "./ScheduleView.css";
import axios from "axios";
import { Button } from "./Button";
import { API_URL } from "../api/auth";
import { Link } from "react-router-dom";
import avatarimg from '../images/avatarimg.jpeg'
import moment from "moment";


function ScheduleView() {
  const [fights, setFights] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [boxers, setBoxers] = useState([]);

   /* Store session token, set token to false, and 
    switch to true if bearerToken is not null and has many characters  */
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


  //Get fights/boxers/gyms data
  useEffect(() => {
    axios
      .get(`${API_URL}/fights`)
      .then((response) => {
        setFights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/boxers`)
      .then((response) => {
        setBoxers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/gyms`)
      .then((response) => {
        setGyms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  var loadedSchedule = false;


  if (fights.length > 0) {
      loadedSchedule = true;
  } else {
      loadedSchedule = false;
  }



  return fights ? (
    <div className="fight-container">
      {fights.map((data) => (
        <div className="fight-cards" key={data.id}>
          <div className="boxers">
              {boxers.map((boxer) => {

                if (boxer.id === data.boxer_a_id) {
                  return (
                    <div className="boxer-data">
                      <img src={avatarimg} width={200} height={200}/>
                      {boxer.first_name} {boxer.last_name}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              <div className="versus">VS</div>

              {boxers.map((boxer) => {
                if (boxer.id === data.boxer_b_id) {
                  return (
                    <div className="boxer-data">
                      <img src={avatarimg} width={200} height={200}/>
                      {boxer.first_name} {boxer.last_name}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div>
            Scheduled Date: {moment(new Date(data.time_scheduled)).format("h:mm a dddd, MMMM DD YYYY")}
          </div>

          {gyms.map((gym) => {
            if (gym.id === data.gym_id) {
              return <div>Location: {gym.name}</div>;
            } else {
              return null;
            }
          })}

          {!!token ? (          
          <div>
            <Link to={"/schedule/" + data.id}>Update Results</Link>
          </div>
          ) : ( <></> )}

          <div>
            {boxers.map((boxer) => {
              if (boxer.id === data.winner_id) {
                return (
                  <div>
                    Winner: {boxer.first_name} {boxer.last_name}
                  </div>
                );
              } else {
                return null;
              }
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
    <div className="loading-text">Loading Fight Schedule, please wait...</div>
  );
}

export default ScheduleView;
