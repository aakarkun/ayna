import axios from 'axios';

// const BASE_URL = 'https://eacce501.ngrok.io';

const BASE_URL = 'http://localhost:8000';

const userId = getUserId();
const userModulesUrl = `/users/${userId}/modules`;
const userUrl = `/users/${userId}`;
// Altering Base URL while creating axios Instance
const axiosInstance = axios.create({
    baseURL: BASE_URL
});
// Alter defaults after instance has been created 
const AUTH_TOKEN = getJwtToken();
axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// To get all the Users and user related data
function getUsersData() {
    const url = '/users';
    return axiosInstance.get(url)
        .then((response) =>  {
            // console.log("data: " + response.data);
            // console.log("status: " + response.status);
            // console.log("statusText: " + response.statusText);
            // console.log("headers: ");
            // console.log(response.headers);
            // console.log("config: ");
            // console.log(response.config);
            return response.data;
        }).catch((error) => {
            if(error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);                
                return error.response;
            } else if(error.request) {
                console.log(error.request);
                return error.request;
            } else {
                console.log("Error: " + error.message);
                return error.message;
            }
        });
}

function loginUser(username, password) {
    const url = "/users/signin";
    return axiosInstance.post(url, {
        'username': username,
        'password': password        
    }).then((response)  => {
        sessionStorage.setItem('ayna-jwt', response.data.token);
        sessionStorage.setItem('user-id', response.data.user.id);
        return response.data;
    }).catch((error) => {
        if(error.response.data.error) {
            return error.response.data.error.details[0].message;
        }
    });
}

function registerUser(username, email, password) {
    const url = "/users/signup";
    return axiosInstance.post(url, {
        'username': username,
        'email': email,
        'password': password
    }).then((response)  => {
        if(response.status === 201){
            return response.data;
        }
    }).catch((error) => {
        // console.log(error.response.status);
        if(error.response.status === 400) {
            return [
                {
                    error: error.response.data.error.details[0].message,
                    code: "400"
                }
            ]
            
        } else if(error.response.status === 403) {
            return [
                {
                    error: error.response.data.error,
                    code: "403"
                }   
            ]
        }
    });
}

function getUserId() {
return sessionStorage['user-id'];
}

function getJwtToken() {
    return sessionStorage['ayna-jwt'];
}

function getUsername() {
    const url = `/users/${userId}`
    return axiosInstance.get(url)
        .then((response) => {
            return response.data.username;
        }).catch((error) => {
            return error;
        })
}

function getUserModules() {
    return axiosInstance.get(userModulesUrl)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })    
}

function getUserData() {
    return axiosInstance.get(userUrl)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            return error;
        })
}

function postUserModule(name, category, surface_area, position, header, defaul) {
    return axiosInstance.post(userModulesUrl, {
        "name": name,
        "category": category,
        "surface_area": surface_area,
        "position": position,
        "header": header,
        "default": defaul
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
}

function deleteUserModule(moduleId) {
    const moduleUrl = `/modules/${moduleId}`;    
    return axiosInstance.delete(moduleUrl)
        .then((response) => {
            console.log("test");
            return response.data;
        }).catch((error) => {
            return error;
        })
}

function patchUserData(data, newData) {
    const url = `/users/${userId}`;
    if(data === "username") {
        return axiosInstance.patch(url, {
            "username" : newData
        }).then((response) => {
            if(response.status === 200){
                return response.data;
            }
        }).catch((error) => {
            if(error.response.status === 400) {
                return [
                    {
                        error: error.response.data.error.details[0].message,
                        code: "400"
                    }
                ]
                
            } else if(error.response.status === 403) {
                return [
                    {
                        error: error.response.data.error,
                        code: "403"
                    }   
                ]
            }
        })
    } else if(data === "email") {
        return axiosInstance.patch(url, {
            "email" : newData
        }).then((response) => {
            if(response.status === 200){
                return response.data;
            }
        }).catch((error) => {
            if(error.response.status === 400) {
                return [
                    {
                        error: error.response.data.error.details[0].message,
                        code: "400"
                    }
                ]
                
            } else if(error.response.status === 403) {
                return [
                    {
                        error: error.response.data.error,
                        code: "403"
                    }   
                ]
            }
        })
    } else {
        return axiosInstance.patch(url, {
            "password" : newData
        }).then((response) => {
            if(response.status === 200){
                return response.data;
            }
        }).catch((error) => {
            if(error.response.status === 400) {
                return [
                    {
                        error: error.response.data.error.details[0].message,
                        code: "400"
                    }
                ]
                
            } else if(error.response.status === 403) {
                return [
                    {
                        error: error.response.data.error,
                        code: "403"
                    }   
                ]
            }
        })
    }
}

export { getUsersData, getUserData, loginUser, registerUser, getUserId, getUsername, getUserModules, postUserModule, deleteUserModule, patchUserData };