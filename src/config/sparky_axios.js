import axios from "axios";

const instance = axios.create({
    //produktiv version
    //baseURL: "https://authenticate.sse.uni-hildesheim.de/",

    //testversion
    baseURL: "http://147.172.178.30:8080/",
    /*     headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
    
        }, */
})


export default instance;