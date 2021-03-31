<template>
    <div class="scroller">
        <h1>{{ category.name }}</h1>
        <!-- List of forums of a category-->
        <div class="scroll">
            <CategoryListItem :category="category" />
        </div>
    </div>
</template>

<script>
  import CategoryListItem from '@/components/CategoryListItem'

  export default {
    components: {
      CategoryListItem
    },
        props: {
        // categoryid 
      id: {
        required: true,
        type: String
      }
    },
        computed: {
        // get all forums by category ID
        category() {
            return this.$store.state.categories[this.id]
      }
    }
  }
</script>

<style scoped>
    .scroll {
        overflow: scroll;
        height: 90%;
        overflow: scroll;
        width: 100%;
        padding: 10px;
    }
</style>
