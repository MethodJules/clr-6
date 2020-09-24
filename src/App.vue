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
   /**/ 
    .sc-launcher {
        position: unset !important;
        height: 60px !important;
        margin-bottom: 20px !important;
        
    }

    .sc-launcher::before {
        position: unset !important;
        height: 60px !important;
        height:unset !important;
    }

    .sc-open-icon {
        position: unset !important;
       
    }

    .sc-closed-icon {
        position: unset !important;
    }

    .sc-chat-window {
        width: 20% !important;
        height: 50% !important;
    }

    .sc-header {
        height: 15% !important;
        min-height: unset !important;
    }
    .sc-header--title {
        font-size: 10px !important;
        min-height: unset !important;
    }

    .sc-message {
        width: unset !important;
        margin-right: 10px !important;
    }
    .sc-message--text {
        padding-bottom: 5px !important;
        padding-top: 5px !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
        font-size: 12px !important;
        max-width: unset !important;

    }
    .sc-message--content.sent {
        margin-left: 15%;
    }

    .sc-message--text-content {
        margin-bottom: 0px;
    }

    .sc-user-input {
        min-height: unset !important;
        height: 10% !important;
    }
    .sc-user-input--text {
        height: 40px !important;
        min-height: unset !important;
        padding: 5px !important;
        width: 90% !important;
    }
    .sc-user-input--button {
        margin-left: 50px !important;
    }


</style>

