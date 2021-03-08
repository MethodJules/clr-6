<!-- Create a new thread -->
<template>
    <form @submit.prevent="save">
        <!-- Form to create Thread -->
        <div class="form-group">
        <!-- Threadname -->
            Threadname:
            <input name=""
                   id=""
                   class="form-input"
                   v-model="title" />
           <!-- Threadslugs-->
            Slugs:
            <input name=""
                   id=""
                   class="form-input"
                   v-model="slug" />
           <!-- Thread message-->
            Message
            <textarea name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-input"
                      v-model="text"></textarea>
        
        </div>

        <!-- Button to create new Thread-->
        <div class="form-actions">
            <button class="btn-red">Create Thread</button>
        </div>
    </form>
</template>

<script>
  export default {
    props: {
        forumId: {
        required: true
      }
    },
    data () {
      return {
          title: '',
          slug: '',
          text: ''
      }
    },
        methods: {

            // save new Thread  
            save() {
                // save Thread with values
                const thread = {
                    title: this.title,
                    slug: this.slug,
                    publishedAt: Math.floor(Date.now() / 1000),
                    userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2',
                    forumId: this.forumId               
                }
                // save first post with values 
                  const post = {
                      text: this.text,
                      publishedAt: Math.floor(Date.now() / 1000),
                      userId: 'jUjmgCurRRdzayqbRMO7aTG9X1G2'
                  }
                // save new Thread and post,put it into store, emit save method from NewThread.vue
                    this.$emit('save', { thread, post })
      }
    }
  }
</script>

<style scoped>
</style>
