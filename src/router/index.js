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
        path: '/newconcept',
        name: 'NewConcept',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/NewConcept.vue')
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
    {
        path: '/forum',
        name: 'Forum',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Forum.vue')
    },
    {
        path: '/category/:id',
        name: 'Category',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ForumCategory.vue'),
        props: true
    },
    {
        path: '/forum/:id',
        name: 'ForumThreads',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ForumCategoryThreads.vue'),
        props: true
    },
    {
        path: '/thread/:id',
        name: 'ThreadShow',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ForumThreadShow.vue'),
        props: true
    },
    {
        path: '/newThread/:id',
        name: 'NewThread',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/NewThread.vue'),
        props: true
    },
    {
        path: '/review',
        name: 'Review',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Review.vue')
    },
    {
        path: '/groupmanagement',
        name: 'Groupmanagement',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Groupmanagement.vue')
    },
    {
        path: '/newMember',
        name: 'NewMember',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/NewMember.vue')
    },
    {
        path: '/dailyscrum',
        name: 'TabelleDaily',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/TabelleDaily.vue')
    },
    {
        path: '/phasetemplate',
        name: 'PhaseTemplate',
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/PhaseTemplate.vue')
    },
    {
        path: '/projectlist',
        name: 'ProjectList',
        component: () => import(/*webpackChunkName: "projectlist" */ '../views/ProjectList.vue')
    },
    {
        path: '/documentation',
        name: 'Documentation',
        component: () => import(/*webpackChunkName: "projectlist" */ '../views/Documentation.vue')
    },

    {
        path: '/reflexion',
        name: 'Reflexion',
        props: true,
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Reflexion.vue')
    }



]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
