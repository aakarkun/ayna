import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export {getModulesData};

function getModulesData() {
    const url = `${BASE_URL}/modules`;
    return axios.get(url).then(response => response.data);
}