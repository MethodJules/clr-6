import { getField, updateField } from 'vuex-map-fields';

const state = () => ({
    controlValue: {
        showLayout: false,

        needHigh: 'standard',
        // aren't used at the moment 
        floatLayout: true,
        enableDownload: true,
        previewModal: true,
        paginateElementsByHeight: 1100,
        manualPagination: true,
        filename: 'Hee Hee',
        pdfQuality: 2,
        pdfFormat: 'a4',
        pdfOrientation: 'portrait',
        pdfContentWidth: '800px'
    }
})


const actions = {
}


const mutations = {
    updateField
}

const getters = {
    getField
}

export default {
    namespaced: true,
    state,
    mutations,
    actions, 
    getters
}