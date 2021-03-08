<template>
    <div class="forum-listing">

        <!-- show forumlistelement -->
        <div class="forum-details">
            <router-link class="text-xlarge"
                         :to="{name:'ForumThreads', params: {id: forum['.key']}}">
                {{forum.name}}
            </router-link>
            <!-- Desciption of the forum-->
            <p>{{forum.description}}</p>
        </div>

        <!-- show number of threads inside the forum-->
        <div class="threads-count">
            <p class="count">{{threadsCound}}</p>
            {{threadsCound === 1 ? 'thread' : 'threads' }}
        </div>


    </div>
</template>

<script>
  import {countObjectProperties} from '@/utils'

  export default {
    props: {
      forum: {
        required: true,
        type: Object
      }
    },
        computed: {
        // count number of threads
      threadsCound () {
        return countObjectProperties(this.forum.threads)
      }
    }
  }
</script>

<style scoped>
</style>
