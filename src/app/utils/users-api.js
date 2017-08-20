import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export { getUsersData, 
         loginUser, 
         registerUser, 
         getUserId, 
         getUserModules,
         postUserModules 
        };

function getUsersData() {
    const url = `${BASE_URL}/users`;
    return axios.get(url).then(response => response.data);
}

function loginUser(username, password) {
    const url = `${BASE_URL}/users/signin`;
    return axios.post(url, {
        'username': username,
        'password': password        
    }).then((response, err) => {
        if(response) {
            sessionStorage.setItem('ayna-jwt', response.data.token);
            sessionStorage.setItem('user-id', response.data.user.id);
            return response.data;
        } else {
            return err;
        }
    });
}

function registerUser(username, email, password) {
    const url = `${BASE_URL}/users/signup`;
    return axios.post(url, {
        'username': username,
        'email': email,
        'password': password
    }).then((response, error) => {
        if(response) {
            return response.data;
        } else {
            return error.data;
        }
    })
}

function getUserId() {
    return sessionStorage['user-id'];
}

function getJwtToken() {
    return sessionStorage['ayna-jwt'];
}

const userId = getUserId();
const userModulesUrl = `${BASE_URL}/users/${userId}/modules`;

function getUserModules() {
    return axios.get(userModulesUrl).then(response => response.data);
}

function postUserModules(name, category, surface_area, position, header, defaul) {
    return axios.post(userModulesUrl, 
        {
            data: {
                "name": name,
                "category": category,
                "surface_area": surface_area,
                "position": position,
                "header": header,
                "default": defaul
            },
            headers: {
                        'Authorization': getJwtToken(),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
            json: true
        }).then((response) => {
            console.log(response.data);
            console.log(response.status);   
        }).catch((error) => {
            console.log(error);
        })
    }