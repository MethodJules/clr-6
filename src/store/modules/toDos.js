const state = () => ({
    toDos: [
        { exercise: 'Literaturrecherche', name: 'Frank', status: "done" },
        { exercise: 'Einleitung schreiben', name: 'Paul', status: "in Progress" },
        { exercise: 'Interview fuehren', name: 'Viktoria', status: "in Progress" },
        { exercise: 'Gruppentreffen vorbereiten', name: 'Jennifer', status: "new" }
    ]
})


const actions = {

}


const mutations = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}