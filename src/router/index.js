import Vue from 'vue'
import VueRouter from 'vue-router'

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
                path: '/forum',
                name: 'Forum',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/forum/Forum.vue')
            },
            {
                path: '/category/:id',
                name: 'Category',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/forum/ForumCategory.vue'),
                props: true
            },
            {
                path: '/forum/:id',
                name: 'ForumThreads',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/forum/ForumCategoryThreads.vue'),
                props: true
            },
            {
                path: '/thread/:id',
                name: 'ThreadShow',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/forum/ForumThreadShow.vue'),
                props: true
            },
            {
                path: '/newThread/:id',
                name: 'NewThread',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/forum/NewThread.vue'),
                props: true
            },
            {
                path: '/groupmanagement/:project_id',
                name: 'Groupmanagement',
                meta: { requiresAuth: true },
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Groupmanagement.vue')
            },
            {
                path: '/newMember/:project_id',
                name: 'NewMember',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/NewMember.vue')
            },

            {
                path: '/phasetemplate/:phase_number/:project_id',
                name: 'PhaseTemplate',
                //props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/phaseTemplate/PhaseTemplate.vue')
            },
            {
                path: '/projectlist',
                name: 'ProjectList',
                component: () => import(/*webpackChunkName: "projectlist" */ '../views/project/ProjectList.vue')
            },

            {
                path: '/projectDescription/:project_id',
                name: 'Projektbeschreibung',
                component: () => import(/*webpackChunkName: "projektbeschreibung" */ '../views/project/Projektbeschreibung.vue')
            },
            {
                path: '/reflexion/:reflexionsPhase/:project_id',
                name: 'ReflexionView',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/ReflexionView.vue')
            },

            {

                path: '/home/:project_id',
                name: 'Home',
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/Home.vue')
            },
            {
                path: '/projectsearch/:keyword',
                name: 'ProjectSearch',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/project/ProjectSearch.vue')
            },

            {
                path: '/profile/:user_internal_uid',
                name: 'StudentProfile',
                props: true,

                component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/profil/StudentProfile.vue')
            },
            {
                path: '/profile/:user_internal_uid',
                name: 'LecturerProfile',
                props: true,
                component: () => import(/*webpackChunkName: "begruessung_home" */ '../components/profil/LecturerProfile.vue')
            },

            {
                path: '/einstellungen',
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
    let isAuthenticated = Boolean(sessionStorage.getItem("valid_credentials")); // true
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
})




export default router
