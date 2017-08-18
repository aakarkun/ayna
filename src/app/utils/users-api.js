import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export {getUsersData, getModulesData};

function getUsersData() {
    const url = `${BASE_URL}/users`;
    return axios.get(url).then(response => response.data);
}