import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export { getModulesData, changePosition };

function getModulesData() {
    const url = `${BASE_URL}/modules`;
    return axios.get(url).then(response => response.data);
}

function changePosition(moduleId, newPos) {
    const url = `${BASE_URL}/modules/${moduleId}`;
    return axios.patch(url, {
        'position': newPos
    }).then(response => response.data);
}