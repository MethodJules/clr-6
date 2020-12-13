<template>
    <div class="home">
        <h1>{{ category.name }}</h1>
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
      id: {
        required: true,
        type: String
      }
    },
    computed: {
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
