<!-- Template for each Post entry-->
<template>
    <div class="post">
        <div class="user-info">
            <!-- show username-->
            <a href="#" class="user-name">{{user.name}}</a>
            
            <!-- show user Image-->
            <a href="#">
                <img class="avatar-large" :src="user.avatar" alt="">
            </a>

            <!-- show number of posts from user -->
            <p class="desktop-only text-small">{{userPostCount}} posts</p>
        </div>

        <!-- show post text-->
        <div class="post-content">
            <div>
                {{post.text}}
            </div>
        </div>

        <!-- show post time -->
        <div class="post-date text-faded">
            <AppDate :timestamp="post.publishedAt" />
        </div>
    </div>
</template>

<script>
  import {countObjectProperties} from '@/utils'
  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },
        computed: {
            // show user by postid 
              user () {
                return this.$store.state.users[this.post.userId]
            },
            // show number of posts of user 
              userPostCount () {
                return countObjectProperties(this.user.posts)
              }
        }
  }
</script>

<style scoped>
</style>
