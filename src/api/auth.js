const TOKEN_KEY = 'session_token';

export const API_URL = process.env.REACT_APP_API_URL

export function signIn(email, password) {
    const url = `${API_URL}/users/sign_in`

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json"'
        },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({ user: { email, password }})
    })
    .then(resp => {
        if (resp.ok) {
            const token = resp.headers.get('Authorization');
            return setToken(token)
        } else {
            const { status, statusText } = resp;
            return Promise.reject({ status, statusText});
        }
    })
}