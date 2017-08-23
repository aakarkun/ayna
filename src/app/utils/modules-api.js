import axios from 'axios';

// const BASE_URL = 'http://9b352016.ngrok.io';
const BASE_URL = 'http://localhost:8000';

export { getDefaultModules, changePosition };

function getDefaultModules() {
    const url = `${BASE_URL}/modules`;
    return axios.get(url).then(response => response.data);
}

function changePosition(moduleId, newPos) {
    const url = `${BASE_URL}/modules/${moduleId}`;
    return axios.patch(url, {
        'position': newPos
    }).then(response => response.data);
}
