const state = () => ({
    phases: [
        {
            phase_id: 1,
            phase_name: 'Gruppe bilden',
        },
        {
            phase_id: 2,
            phase_name: 'Literatur'
        },
        {
            phase_id: 3,
            phase_name: 'Daten'
        } 
    ]
})

export default {
    namespaced: true,
    state
}