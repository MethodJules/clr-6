
const state = () => ({
    // Daten der Diagramme, jeweils in einem Array gespeichert für jeden einzelnen Teil ein Wert 
    chartData: 
    {
        // Name 
        labels: ["Books", "Magazines", "Newspapers"],

        // Farbe
        backgroundColor: ["#0000FF", "#00FF00", "#FF0000"],

        // Daten / Anteil an dem Gesamtelement, bzw. größe des Balkens 
        data: [30, 20, 10]   
        }


    
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