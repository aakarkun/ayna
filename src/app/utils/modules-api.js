import axios from 'axios';
import { isLoggedIn } from './AuthService';

<<<<<<< HEAD
// const BASE_URL = 'https://160c42be.ngrok.io';
=======
// const BASE_URL = 'https://eacce501.ngrok.io';
>>>>>>> 62a342c79a954f4df14c1a2e09b35d50bfd52fb0
const BASE_URL = 'http://localhost:8000';

const userId = getUserId();

// Altering Base URL while creating axios Instance
const axiosInstance = axios.create({
    baseURL: BASE_URL
});
// Alter defaults after instance has been created 
const AUTH_TOKEN = getJwtToken();
axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


function getDefaultModules() {
    const url = `/modules`;
    return axiosInstance.get(url).then(response => response.data);
}

function getModules() {
    const defaultModulesUrl = `/modules`;    
    const userModulesUrl = `/users/${userId}/modules`;
    if(!isLoggedIn()) {
        console.log("User not Logged in!");
        return axiosInstance.get(defaultModulesUrl).then(response => response.data);        
    } else {
        console.log("User Logged in!");
        return axiosInstance.get(userModulesUrl).then(response => response.data);
    }
}

function getModule(moduleId) {
    const moduleUrl = `/modules/${moduleId}`;
    return axiosInstance.get(moduleUrl)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            if(error.response.status === 400) {
                return [
                    {
                        error: error.response.data,
                        code: 400
                    }
                ]
            }
        });
}

function checkModule(moduleId) {
    const moduleUrl = `/modules/${moduleId}`;
    console.log("Checking User Module Installed or not?");
    return axiosInstance.get(moduleUrl)
        .then((response) => {
            console.log(response.data.user);
            console.log(userId);
            if(response.data.user === userId) {
                console.log("INSTALLED!!");
                return [
                    {
                        status: "Installed",
                        module: response.data.name
                    }
                ]
            } else {
                return [
                    {
                        status: "Install"
                    }
                ]
            }
        }).catch((error) => {
            if(error.response.status === 400) {
                return [
                    {
                        error: error.response.data,
                        code: 400
                    }
                ]
            }
        });
}

function changePosition(moduleId, newPos) {
    const url = `/modules/${moduleId}`;
    console.log("moving.. .");
    return axiosInstance.patch(url, {
        'position': newPos
    }).then(response => response.data);
}

function getUserId() {
    return sessionStorage['user-id'];
}

function getJwtToken() {
    return sessionStorage['ayna-jwt'];
}

export { getDefaultModules, getModules, getModule, changePosition, checkModule };