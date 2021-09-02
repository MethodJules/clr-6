import axios from 'axios';

const state = {
    lecturers: [],
    students: []
}

const getters = {

    getLecturers(state) {
        /*        console.log("hello form getlecturers")
               console.log(state.lecturers)
               console.log(state.lecturers.field_fullname)
               console.log(state.lecturers[0][1])
       
               let lecturer_array=[]
               for (let lecturer in state.lecturers[0]){
                 //lecturer_array.push({name: lecturer.field_fullname, uid: lecturer.uid, uuid: lecturer.uuid })
                   lecturer_array.push(lecturer)
                   console.log(lecturer[1])
                   console.log(lecturer)
               }
               console.log(lecturer_array)
               return lecturer_array */


        let lecturer_array = []
        for (let lecturer of state.lecturers) {
            //lecturer_array.push({name: lecturer.field_fullname, uid: lecturer.uid, uuid: lecturer.uuid })
            //console.log(student[1].field_fullname[0].value)
            console.log(lecturer)
            //lecturer_array.push({name: lecturer.field_fullname, uid: lecturer.uid, uuid: lecturer.uuid })
            lecturer_array.push({ name: lecturer[1].field_fullname[0].value, uid: lecturer[1].uid[0].value, uuid: lecturer[1].uuid[0].value })
            //student_array.push(student[1].field_fullname[0].value)

        }
        console.log(lecturer_array)
        return lecturer_array
    },

    getStudents(state) {



        /* 
                let students = Object.entries(response.data.users)
                      
        
                let student_array=[]
                for (let student of students){
                  //lecturer_array.push({name: lecturer.field_fullname, uid: lecturer.uid, uuid: lecturer.uuid })
                    student_array.push(student[1].field_fullname[0].value)
                    //student_array.push(student[1].name[0].value)
                   // console.log(student[1])
                   // console.log(student[1].name[0].value)
                    console.log(student[1].field_fullname[0].value)
                    //ist undefined bei foo3bar obwohl full_name später noch hinzugefügt wurde
                   //console.log(student[1].field_fullname[0].value)
        
                }
                console.log(student_array) */

        let student_array = []
        for (let student of state.students) {
            //lecturer_array.push({name: lecturer.field_fullname, uid: lecturer.uid, uuid: lecturer.uuid })
            student_array.push({ name: student[1].field_fullname[0].value, uid: student[1].uid[0].value, uuid: student[1].uuid[0].value })
            //student_array.push(student[1].field_fullname[0].value)

        }
        console.log(student_array)


        return student_array

    }




}



const actions = {


    async loadLecturersFromBackend({ commit, state, rootState }) {
        console.log(state)

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/clr/clr_resource/lecturer?_format=json`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response)

                let lecturers = response;
                console.log(response.data.users)
                //das hier ist korrekt
                console.log(response.data.users[13].field_fullname[0].value)
                lecturers = Object.entries(response.data.users)
                console.log(lecturers)
                commit('LOAD_LECTURERS', lecturers);

            })
            .catch(function (error) {
                console.log(error)
            })

    },

    async loadStudentsFromBackend({ commit, state, rootState }) {
        console.log(state)

        var config = {
            method: 'get',
            url: `https://clr-backend.x-navi.de/clr/clr_resource/student?_format=json`,
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': rootState.drupal_api.authToken,
                'X-CSRF-Token': `${rootState.drupal_api.csrf_token}`
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response)
                //funzt
                console.log(response.data.users[4].field_fullname[0].value)
                console.log(Object.entries(response.data.users))
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