import axios from "axios";

const instance = axios.create({
    baseURL: "http://147.172.178.30:",
    /*     headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
    
        }, */
})


export default instance;