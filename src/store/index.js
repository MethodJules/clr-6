import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import sourceData from '@/data.json'
import members from './modules/members'
import reflexion from './modules/reflexion'
import documentation from './modules/documentation'
import tool from './modules/tool'
import todo from './modules/todo'
import assistent from './modules/assistent'
import inputDocuments from './modules/inputDocuments'
import phases from './modules/phases'
import project from './modules/project'
import output_documents from './modules/output_documents'
import postfach from './modules/postfach'
import sparky_api from './modules/sparky_api'
import drupal_api from './modules/drupal_api'


Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
    modules: {
       items,
       project,
       members,
       reflexion,
       documentation,
       tool,
       todo,
       assistent,
       phases,
       output_documents,
       postfach,
        sparky_api,
       inputDocuments,
       drupal_api,
    },

    //noch in Datei packen
    state: {
        ...sourceData,
        // authId: '98St7Q8Zi2N9SPa5ahzssq9kbyp6'
        authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',

    },

    getters: {
        authUser(state) {
            return state.users[state.authId]
        },

    },

    actions: {
        createPost(context, post) {
            const postId = 'greatPost' + Math.random()
            post['.key'] = postId

            context.commit('setPost', { post, postId })
            context.commit('appendPostToThread', { threadId: post.threadId, postId })
            context.commit('appendPostToUser', { userId: post.userId, postId })
        },

        // create new Thread
        createNewThread(context, [thread, post]) {
            const threadId = 'greatThread' + Math.random()
            const postId = 'greatPost' + Math.random()

            thread['.key'] = threadId
            thread['posts'] = []
            post['.key'] = postId
            post['threadId'] = threadId

            context.commit('setPost', { post, postId })
            context.commit('appendPostToUser', { userId: post.userId, postId })

            thread['firstPostId'] = postId
            thread['lastPostId'] = postId
            thread['lastPostAt'] = post.publishedAt


            context.commit('setThread', { thread, threadId })
            context.commit('appendPostToThread', { threadId: post.threadId, postId })
            context.commit('appendThreadToForum', { forumId: thread.forumId, threadId })


        }
    },

    mutations: {
        setPost(state, { post, postId }) {
            Vue.set(state.posts, postId, post)
        },

        appendPostToThread(state, { postId, threadId }) {
            const thread = state.threads[threadId]
            Vue.set(thread.posts, postId, postId)
        },

        appendPostToUser(state, { postId, userId }) {
            const user = state.users[userId]
            Vue.set(user.posts, postId, postId)
        },

        setThread(state, { thread, threadId }) {
            Vue.set(state.threads, threadId, thread)
        },

        appendThreadToForum(state, { threadId, forumId }) {
            const forum = state.forums[forumId]
            Vue.set(forum.threads, threadId, threadId)

        },



    },



})