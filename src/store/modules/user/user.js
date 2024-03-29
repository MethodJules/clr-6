import axios from "@/config/custom_axios";


const state = {
    lecturers: [],
    students: []
}

const getters = {

    getLecturers(state) {
        let lecturer_array = []
        for (let lecturer of state.lecturers) {
            if ((typeof lecturer[1].field_fullname[0]) !== 'undefined') {
                lecturer_array.push({ name: lecturer[1].field_fullname[0].value, uid: lecturer[1].uid[0].value, uuid: lecturer[1].uuid[0].value })
            }
        }
        return lecturer_array
    },

    getStudents(state) {
        let student_array = []
        for (let student of state.students) {
            if ((typeof student[1].field_fullname[0]) !== 'undefined') {
                student_array.push({ name: student[1].field_fullname[0].value, uid: student[1].uid[0].value, uuid: student[1].uuid[0].value })
            }
        }
        return student_array

    }
}

const actions = {


    async loadLecturersFromBackend({ commit, rootState }) {
        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");

        var config = {
            method: 'get',
            url: `clr/clr_resource/lecturer?_format=json`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authToken,
                'X-CSRF-Token': csrfToken
            },
        };
        axios(config)
            .then(function (response) {
                let lecturers = response;
                lecturers = Object.entries(response.data.users)
                commit('LOAD_LECTURERS', lecturers);

            })
            .catch(function (error) {
                console.log(error)
            })

    },

    async loadStudentsFromBackend({ commit }) {
        const authToken = sessionStorage.getItem("auth_token");
        const csrfToken = localStorage.getItem("csrf_token");
        var config = {
            method: 'get',
            url: `clr/clr_resource/student?_format=json`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': authToken,
                'X-CSRF-Token': csrfToken
            },
        };
        axios(config)
            .then(function (response) {
                const students = Object.entries(response.data.users)
                commit('LOAD_STUDENTS', students);

            })
            .catch(function (error) {
                console.log(error)
            })

    },



}

const mutations = {

    LOAD_LECTURERS(state, data) {
        state.lecturers = data;

    },


    LOAD_STUDENTS(state, data) {
        state.students = data;

    },

}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}