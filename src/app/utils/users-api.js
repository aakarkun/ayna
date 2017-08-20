import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export { getUsersData, login, isLoggedIn };

function getUsersData() {
    const url = `${BASE_URL}/users`;
    return axios.get(url).then(response => response.data);
}

function login(username, password) {
    const url = `${BASE_URL}/users/signin`;
    return axios.post(url, {
        'username': username,
        'password': password
    }).then((response, err) => {
        if(!err) {
            return response.data;
        } else {
            return err;
        }
    })
}

function isLoggedIn() {
    const url = `${BASE_URL}/signin`;
}