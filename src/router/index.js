import Vue from 'vue'
import VueRouter from 'vue-router'
//import BegruessungPage from '../views/BegruessungPage.vue'

Vue.use(VueRouter)

const routes = [
   
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
        meta: {requiresAuth: true},
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
        path: '/phasetemplate/:phase_id:project_id',
        name: 'PhaseTemplate',
        //props: true,
        component: () => import(/*webpackChunkName: "begruessung_home" */ '../views/PhaseTemplate.vue')
    },
    {
        path: '/',
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

/*     {
        path: '/group',
        name: 'Groupmanagement',
        props: true,
        component: () => import(webpackChunkName: "begruessung_home"  '../views/Groupmanagement.vue')
    }, */
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
 

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

  
router.beforeEach((to, from, next) => {
    // check if route requires Login 
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("in")

        // check if user is logged in 
        if (localStorage.getItem("userLoggedIn") != null) {  
            console.log(localStorage.getItem("userLoggedIn"))       
            next()
        } else {
            alert("Login erforderlich")
            console.log("in")

            next({name: 'App'})
        }

       
    } else {
        next();
    }

})


/* router.beforeEach((to, from, next) => {
    // check if route requires Login 
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("in")

        // check if user is logged in 
        if (localStorage.getItem("userLoggedIn") != null) {  
            console.log(localStorage.getItem("userLoggedIn"))       
            next()
        } else {
            alert("Login erforderlich")
            console.log("in")

            next({name: 'App'})
        }

       
    } else {
        next();
    }

}) */

export default router
