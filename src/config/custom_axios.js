import axios from "axios";
//custom axios for easy change of server adress

const instance = axios.create({
    baseURL: "https://clr-backend.x-navi.de/",
    // baseURL : "https://clr-backend.ddns.net/",
})

/*
chat server url is in ChatAdvanced.vue and has to be changed directly if needed
url used: https://clr-backend.ddns.net/
    */
export default instance;