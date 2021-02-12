<!-- Startseite des Forums, Übersicht-->
<template>
    <div class="home">
        <h1>Welcome to the Forum</h1>
        <!-- Zeigt alle Kategorien des Forums, ruft Komponente auf -->
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