<!-- Groupmanagement -->
<template>
    <div class="home">
        <h1> Gruppenverwaltung </h1>

        <div>
            <!-- create membercard for each member in group with name, role and delete-Button -->
            <b-card class="groupCard" v-for="(member, index) in members.members" :key="index">
                <h3>{{member.name}}</h3>
                <b-button @click="deleteMember(member)"> X </b-button>
                <br />
                <img src="~@/assets/profilbild.png" alt="Avatar">
                <h5>{{member.role}}</h5>
            </b-card>

            <!--Card to add new Member, routerlink -->
            <b-card class="groupCard">
                <router-link to="newMember" tag="div">
                    <div class="w3-container w3-center">
                        <h3>Neues Mitglied hinzuf&uuml;gen</h3>
                    </div>
                </router-link>
            </b-card>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

    export default {
    name: 'Home',
    components: {},
    data() {
        return {
        }
    },
    methods: {
        // delete Member from group 
        deleteMember: function (member) {
            this.$store.dispatch('members/deleteMembers', member)

        }
        },
        // get members from store 
        computed: {
            ...mapState({
                members: state => state.members,
            })
        }

}
</script>

<style scoped>

    h1 {
        text-align: center;
    }

    h3 {
        float:left;
        margin: 3px;
        margin-left: 10%;
        display: inline-block;
    }
    h5 {
        text-align: center;
    }

    button {
        background-color: #c93e37 !important;
        border-color: #c93e37 !important;
        float: right;
    }

    .groupCard {
        background-color: #c93e37;
        color: white;
        margin: 5px;
        width: 30%;
        text-align: center;
    }

    .card {
        display: inline-block;
    }

    img {
        width: 60%;
    }

</style>