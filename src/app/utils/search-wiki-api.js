import axios from 'axios';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
var format = "&format=json";
var request_url = "?action=query&format=json&list=search&srsearch=";

// Altering Base URL while creating axios Instance
const axiosInstance = axios.create({
    baseURL: BASE_URL
});


function searchWiki(keyword) {
    var url = BASE_URL + request_url + keyword;

    return axiosInstance.get(url, { crossdomain: true })
    .then((response) => {
        // console.log(response.data.query);
        return response.data.query;
    })

}

export { searchWiki };