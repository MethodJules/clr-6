import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'
import concepts from './modules/concepts'
import concept_map from './modules/concept_map'
import sourceData from '@/data.json'
import members from './modules/members'
import toDos from './modules/toDos'
import chartData from './modules/chartData'
import controlValue from './modules/controlValue'
Vue.use(Vuex)

Vue.config.devtools = true

// load storedata
export default new Vuex.Store({
    modules: {
       items,
       concepts,
       concept_map,
       members, 
        toDos, 
        chartData, 
        controlValue
    },

    state: {
        // load Data from data.json, forumdata
        ...sourceData,
        // authId: '98St7Q8Zi2N9SPa5ahzssq9kbyp6'
        authId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
    },


    getters: {
        // get userdata fot auth 
        authUser(state) {
            return state.users[state.authId]
        }
    },

    actions: {
        // create new Userpost
        createPost(context, post) {

            // create random postid 
            const postId = 'greatPost' + Math.random()
            post['.key'] = postId

            // store new post
            context.commit('setPost', { post, postId })
            // append post to thread
            context.commit('appendPostToThread', { threadId: post.threadId, postId })
            // append post to user
            context.commit('appendPostToUser', { userId: post.userId, postId })
        },

        // create new Thread
        createNewThread(context, [thread, post]) {

            // create random thread and post id
            const threadId = 'greatThread' + Math.random()
            const postId = 'greatPost' + Math.random()
            thread['.key'] = threadId
            thread['posts'] = []
            post['.key'] = postId
            post['threadId'] = threadId

            // store new post
            context.commit('setPost', { post, postId })
            // append post to user
            context.commit('appendPostToUser', { userId: post.userId, postId })

            // set first thread post 
            thread['firstPostId'] = postId
            thread['lastPostId'] = postId
            thread['lastPostAt'] = post.publishedAt
           
            // create new thread
            context.commit('setThread', { thread, threadId })
            // append post to thread 
            context.commit('appendPostToThread', { threadId: post.threadId, postId })
            // append thread to forum 
            context.commit('appendThreadToForum', { forumId: thread.forumId, threadId })
            

        }
    },

    mutations: {
        // set new post, add to store 
        setPost(state, { post, postId }) {
            Vue.set(state.posts, postId, post)
        },

        // append new Post to Thread, add to store 
        appendPostToThread(state, { postId, threadId }) {
            const thread = state.threads[threadId]
            Vue.set(thread.posts, postId, postId)
        },

        // append new Post to User
        appendPostToUser(state, { postId, userId }) {
            const user = state.users[userId]
            Vue.set(user.posts, postId, postId)
        },

        // set new Thread
         setThread(state, { thread, threadId }) {
             Vue.set(state.threads, threadId, thread)
        },

         // append new thread to forum
        appendThreadToForum(state, { threadId, forumId }) {
            const forum = state.forums[forumId]
            Vue.set(forum.threads, threadId, threadId)

        },


    }

})
