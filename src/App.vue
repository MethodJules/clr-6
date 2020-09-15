<template>
    <div id="app">
        <v-app>
            <v-main class="background">
                <v-container>
                    <Navigation> </Navigation>
                </v-container>
                <v-container>
                    <router-view />
                </v-container>
                
            </v-main>
        </v-app>
    </div>
</template>


<script>

    import Navigation from '@/components/Navigation.vue'

    export default {
        name: 'App',
        components: {
            Navigation
        }
    }
</script>
<style>
    .background {
        background-color: red;
        background-image: url('~@/assets/background2.jpg'); 
        width: 100%;
        height: 90%;
        position: absolute;
        background-size: cover
    }

</style>

