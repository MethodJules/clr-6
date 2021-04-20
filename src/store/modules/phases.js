const state = () => ({
    phases: [
        {
            phase_id: 0,
            phase_name: 'Gruppe bilden',
        },
        {
            phase_id: 1,
            phase_name: 'Ziel & Umfang definieren'
        },
        {
            phase_id: 2,
            phase_name: 'Konzepte & Definitionen identifizieren'
        },
        {
            phase_id: 3,
            phase_name: 'Literatur suchen'
        },
        {
            phase_id: 4,
            phase_name: 'Daten extrahieren'
        },
        {
            phase_id: 5,
            phase_name: 'Literatur analysieren & synthetisieren'
        },
        {
            phase_id: 6,
            phase_name: 'Ergebnisse kommunizieren'
        },
        {
            phase_id: 7,
            phase_name: 'Gruppe auflösen'
        } 
    ]
})

export default {
    namespaced: true,
    state
}