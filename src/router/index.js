import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

//import BegruessungPage from '../views/BegruessungPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Login.vue')
    },
    {
        path: "/",
        name: "MainPage",
        redirect: "/projectlist",
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/MainPage.vue'),
        children: [
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
                path: '/forum/:project_id',
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
                path: '/groupmanagement/:project_id',
                name: 'Groupmanagement',
                meta: { requiresAuth: true },
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Groupmanagement.vue')
            },
            {
                path: '/newMember',
                name: 'NewMember',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/NewMember.vue')
            },

            {
                path: '/phasetemplate/:phase_id:project_id',
                name: 'PhaseTemplate',
                //props: true,
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
                path: '/projectDescription/:project_id',
                name: 'Projektbeschreibung',
                component: () => import(/*webpackChunkName: "projektbeschreibung" */ '../views/Projektbeschreibung.vue')
            },
            {
                path: '/reflexion/:reflexionsPhase',
                name: 'ReflexionView',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ReflexionView.vue')
            },

            {
                //path: '/home:user_id',
                path: '/home/:project_id',
                name: 'Home',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Home.vue')
            },
            {
                path: '/showchat',
                name: 'ShowChat',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ShowChat.vue')
            },
            {
                path: '/projectsearch/:keyword2',
                name: 'ProjectSearch',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ProjectSearch.vue')
            },
            {
                path: '/postfach',
                name: 'Postfach',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Postfach.vue')
            },

            {
                path: '/profil/:project_id',
                name: 'Profil',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Profil.vue')
            },

            {
                path: '/einstellungen/:project_id',
                name: 'Einstellungen',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Einstellungen.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    //let isAuthenticated = store.state.drupal_api.validCredential;
    //let isAuthenticated = sessionStorage.getItem("valid_credentials") == "true";


    let isAuthenticated = Boolean(sessionStorage.getItem("valid_credentials")); // true

    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
})




export default router
