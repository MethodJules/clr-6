<template>
    
    <div class="navigation">
        <router-link tag="div" to="/scope" class="element">
            <p><b>Scope </b></p>
        </router-link>
        <router-link tag="div" to="/concept" class="element">
            <p><b>Concept </b></p>
        </router-link>
        <router-link tag="div" to="/search" class="element">
            <p><b>Search </b></p>
        </router-link>
        <router-link tag="div" to="/analysis" class="element">
            <p><b>Analysis </b></p>
        </router-link>
        <router-link tag="div" to="/agenda" class="element">
            <p><b>Agenda </b></p>
        </router-link>
        <div class="search" @click="showDiv()">
            <p><b>&#9993; </b></p>
        </div>
        <div v-if="showSearch" class="viewSearch">
            <v-btn class="closeButton" @click="closeDiv()"> &#10006; </v-btn>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data: function () {
            return {
                showSearch: false
            }
        },
        components: {
        },
        methods: {
            showDiv() {
                this.showSearch = true;
            },
            closeDiv() {
                this.showSearch = false;
            }
        }

    }
</script>
<style scoped>
    .navigation {
        background-color: #362c2b;
        width: 20%;
        right: 10px;
        position: absolute;
        height: 99%;
        margin-top: 5px;    
        
    }
    .element {
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
    .router-link-active {
        background: #c93e37;
        color: white;
    }

    p {
        display: table-cell;
        vertical-align: middle;
    }
    .search {
        background-color: #c93e37;
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
</style>

