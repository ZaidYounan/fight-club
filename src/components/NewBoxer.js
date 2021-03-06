import React, { useEffect, useState } from "react";
import "./NewBoxer.css";
import axios from "axios";
import { useHistory } from "react-router";
import { API_URL } from "../api/auth";

function NewBoxer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [reach, setReach] = useState("");
  const [stance, setStance] = useState("");
  const [gym, setGym] = useState("");
  const [gyms, setGyms] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);


    /* Attach avatar formdata (couldn't get it working in time, 
    but it doesn't impede the form submission */
    const formData = new FormData();
    formData.append('file',avatar);


    const data = {
      first_name: firstName,
      last_name: lastName,
      height: height,
      weight: weight,
      reach: reach,
      stance: stance,
      gym_id: gym,
      avatar: avatar,
    };

    //Post boxer data
    axios.post(`${API_URL}/boxers`, data).then((res) => {
      setData(res.data);
      setFirstName("");
      setLastName("");
      setHeight("");
      setWeight("");
      setReach("");
      setStance("");
      setGym("");
      setAvatar("");
      setLoading(false);
      history.push("/fighters/");
    });
  };

  //Get gyms to display gym names in drop-down menu
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
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="mt-2">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="height" className="mt-2">
            Height
          </label>
          <input
            type="number"
            className="form-control"
            id="height"
            placeholder="Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight" className="mt-2">
            Weight
          </label>
          <input
            type="number"
            className="form-control"
            id="weight"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reach" className="mt-2">
            Reach
          </label>
          <input
            type="number"
            className="form-control"
            id="reach"
            placeholder="Reach"
            value={reach}
            onChange={(e) => setReach(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stance" className="mt-2">
            Stance
          </label>
          <input
            type="string"
            className="form-control"
            id="stance"
            placeholder="Stance"
            value={stance}
            onChange={(e) => setStance(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            className="form-control"
            id="gym_id"
            placeholder="Gym ID"
            onChange={(e) => setGym(e.target.value)}
            onSubmit={(e) => setGyms(e.target.value)}
          >
            <option value="Please Select A Gym">'Please Select A Gym'</option>
            {gyms.map((gym) => (
              <option key={gym.value} value={gym.id}>
                {gym.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="height" className="mt-2">
              Choose An Avatar
          </label>
          <input
              type="file"
              className="form-control"
              id="avatar"
              placeholder="Avatar"
              onChange={(e) => setAvatar(e.target.value)
            }
              value={avatar}
              src={avatar}
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
      </div>
    </div>
  );
}

export default NewBoxer;
