<template>
    <div class="forum-list">
        <h2 class="list-title">
            <!-- Router Link to category-->
            <router-link :to="{name: 'Category', params: {id: category['.key']}}">
                {{ category.name }}
            </router-link>
        </h2>
        <!-- show List of forums from one Category-->
          <ForumList :forums="categoryForums" />
    </div>
</template>

<script>
   import ForumList from '@/components/ForumList'
  export default {
    props: {
      category: {
        required: true,
        type: Object
      }
    },
    components: {
      ForumList
    },
    computed: {
        categoryForums() {
         // get all forums from one category from store
        return Object.values(this.$store.state.forums)
          .filter(forum => forum.categoryId === this.category['.key'])
      }
    }
  }
</script>

<style scoped>
</style>
