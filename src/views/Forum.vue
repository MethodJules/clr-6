<!-- Startseite des Forums, Übersicht-->
<template>
    <div class="scroller">
        <h1>Welcome to the Forum</h1>
        <!-- Show all Categories of the forum, import Categorylist-Component -->
        <CategoryList :categories="categories" />
    </div>
</template>

<script>
    import CategoryList from '@/components/CategoryList'

    export default {
        name: 'Home',
        components: {
            CategoryList
        },
        computed: {
            // load categries from store
            categories() {
                return Object.values(this.$store.state.categories)
            }
        }
    }
</script>
<style>
    h1 {
        color: #c93e37;
    }

</style>