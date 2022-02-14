<template>
        <div class="home">
            <div class="col-large push-top">
                <div class="scroll">
                    <h1>{{thread.title}}</h1>

                    <p>
                        By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt" />.
                        <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
                    </p>
                    
                    <PostList :posts="posts" />
            
                    <PostEditor @save="addPost"
                                :threadId="id" />


                </div>
            </div>
        </div>
</template>

<script>
  import PostList from '@/components/PostList'
  import PostEditor from '@/components/PostEditor'

  export default {
    components: {
      PostList,
      PostEditor
    },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        thread: this.$store.state.threads[this.id],
        newPostText: ''
      }
    },
    computed: {
      posts () {
        // get the Ids of the posts in this thread
       
          const postIds = Object.values(this.thread.posts)

        // search the posts in the this.$store.state that have .key equal to the ones in this thread
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))

      }
    },
    methods: {
      addPost ({post}) {
        this.$store.dispatch('createPost', post)
      }
    }
  }
</script>

<style scoped>

    .scroll {
        overflow: scroll;
        height: 100%;
        overflow: scroll;
        width: 100%;
        padding: 10px;
    }
</style>
s