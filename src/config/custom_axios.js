import axios from "axios";
//custom axios for easy change of server adress

// const authToken = sessionStorage.getItem("auth_token");
// const csrfToken = localStorage.getItem("csrf_token");

const instance = axios.create({
    baseURL: "https://clr-backend.x-navi.de/",
    // baseURL: "https://clr-backend.ddns.net/",
    // headers: {
    //     'Accept': 'application/vnd.api+json',
    //     'Content-Type': 'application/vnd.api+json',
    //     'Authorization': authToken,
    //     'X-CSRF-Token': csrfToken
    // },
})

/*
chat server url is in ChatAdvanced.vue and has to be changed directly if needed
url used: https://clr-backend.ddns.net/
    */
export default instance;