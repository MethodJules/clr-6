import Vue from 'vue'
import VueRouter from 'vue-router'
//import BegruessungPage from '../views/BegruessungPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Home.vue')
    },
    {
        path: '/scope',
        name: 'Scope',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Scope.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Search.vue')
    },
    {
        path: '/concept',
        name: 'Concept',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Concept.vue')
    },
    {
        path: '/analysis',
        name: 'Analysis',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Analysis.vue')
    },
    {
        path: '/agenda',
        name: 'Agenda',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Agenda.vue')
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
