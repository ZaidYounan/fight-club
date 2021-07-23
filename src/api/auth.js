import axios from "axios";

const TOKEN_KEY = 'session_token';

export const API_URL = process.env.REACT_APP_API_URL

const register = (username, email, password) => {
    return axios.post(API_URL + "/users/sign_up", {
      first_name,
      last_name,
      email,
      password,
      gym_id
    });
  };

const login = (email, password) => {
return axios
    .post(API_URL + "/users/sign_in", {
    email,
    password,
    })
    .then((response) => {
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
  };

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};



// export function signIn(email, password) {
//     const url = `${API_URL}/users/sign_in`

//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json"'
//         },
//         mode: 'cors',
//         cache: 'no-cache',
//         body: JSON.stringify({ user: { email, password }})
//     })
//     .then(resp => {
//         if (resp.ok) {
//             const token = resp.headers.get('Authorization');
//             return setToken(token)
//         } else {
//             const { status, statusText } = resp;
//             return Promise.reject({ status, statusText});
//         }
//     })
// }