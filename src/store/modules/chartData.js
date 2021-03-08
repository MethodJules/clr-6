
const state = () => ({
    // Data for the charts, each data saved in Array, for each part one entry in array 
    chartData: 
    {
        // name
        labels: ["Books", "Magazines", "Newspapers"],

        // color
        backgroundColor: ["#0000FF", "#00FF00", "#FF0000"],

        // data/ part of the element, (part of piechart, length of barchart)
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