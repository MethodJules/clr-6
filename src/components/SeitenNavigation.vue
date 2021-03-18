<template>

    <div class="seitennavigation">


                           <!--  <p><b-button href="Gruppe bilden" @click="hide" variant="outline-dark" >Gruppe bilden</b-button></p>
                            <p><b-button href="Ziel" @click="hide" variant="outline-dark">Ziel & Umfang</b-button></p>  -->
                            <!-- <router-link tag="div" to="./concept">
                                <p><b-button variant="outline-dark" >Konzepte & Definitionen </b-button></p>
                            </router-link> <br>
                            -->
                          <br>

                                <!-- <b-link :to="{name: 'NAME DER ROUTE AUS router/index.js'}" class="btn btn-outline-dark btn-block mb-2">MENU LINK</b-link> -->
                                <b-link :disabled=isDisabled :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe bilden'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe bilden</b-link>
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Ziel'}}" class="btn btn-outline-dark btn-block mb-2">Ziel</b-link>
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Literatur'}}" class="btn btn-outline-dark btn-block mb-2">Literatur</b-link>
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Daten'}}" class="btn btn-outline-dark btn-block mb-2">Daten</b-link>                         
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Analyse'}}" class="btn btn-outline-dark btn-block mb-2">Analyse</b-link>
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Ergebnisse'}}" class="btn btn-outline-dark btn-block mb-2">Ergebnisse</b-link>
                                <b-link :disabled=isDisabled  :to="{name: 'PhaseTemplate', params: { phase: 'Gruppe auflösen'}}" class="btn btn-outline-dark btn-block mb-2">Gruppe auflösen</b-link>
   
  
        <b-dropdown text="Phasen abschließen" class="m-2">
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Gruppe bilden" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('ziel')">"Ziel" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Literatur" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Daten" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Analyse" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Ergebnisse" abschließen</b-dropdown-item>
                <b-dropdown-item v-on:click="phaseAbschließen('gruppe')">"Gruppe auflösen" abschließen</b-dropdown-item>
        </b-dropdown>

    </div>
</template>
<script>

    export default {
        name: 'App',
        data: function () {
            return {
                isDisabled: false
            }
        },
        components: {

        },
        methods: {
            
        phaseAbschließen(phase) {
            console.log(phase)
           
            this.isDisabled=true
            
        }

        }

    }
</script>
<style scoped>
   /*  .seitennavigation {
        background-color: #362c2b;
        width: 20%;
        right: 10px;
        position: absolute;
        height: 99%;
        margin-top: 5px;

    }
    b-button-group {
        background-color: white;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;

    }
    */
    .router-link-active {
        background: #c93e37 !important;
        color: white;

    }

    p {
        display: table-cell;
        vertical-align: middle;
    }
    .search {
        width: 30%;
        margin-left: 30%;
        position: absolute;
        bottom: 0;
        text-align: center;
        height: 8%;
        display: table;
        margin-top: 20px;
        color: white
    }
    .viewSearch {
        background-color: #c93e37;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0;
        height: 20%;
        display: table;
        margin-top: 20px;
    }

    .closeButton {
        background-color: #c93e37;
        position: absolute;
        right: 5px;
    }
    .forum {
        position: absolute;
        bottom: 0;
        margin-left: 65%;
        width: 30%;
        height: 60px;
        background-color: #c93e37;
        text-align: center;
        margin-bottom: 20px;
        display: table;
        cursor: pointer;
        color: white;
        border-radius: 50%;
    }

        .buttons {
        background-color: white;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        height: 12%;
        display: table;
        margin-top: 25px;
        cursor: pointer;
    }


</style>








