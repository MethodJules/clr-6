<template>
    <div class="home">
    
        <b-row>
        <h2> Projektgruppe "Projekt x" </h2>
        </b-row>
        <br />

        <div>
            <div
            v-for="(member, index) in members.members" :key="index">
                
            <b-row>
                <b-col>  
                <h5>{{member.role}}</h5>
                </b-col>
                <b-col>
                <h5>{{member.name}}</h5>
                </b-col>
                <b-col>
                <b-button @click="deleteMember(member)"> X </b-button>
                <br>
                </b-col>
                
                
            </b-row>
                
                
                
                
            </div>
            
            <b-container>
            <b-row>
                <b-col>
                <b-button>
                <router-link to="newMember" tag="div">
                    
                        Neues Mitglied hinzufügen
                  
                </router-link>
                </b-button>
                </b-col>
                <b-col>
                <b-button>Admin-Rechte entfernen</b-button>
                </b-col>
                <b-col>
                <b-button v-b-modal.leave_group>Gruppe verlassen</b-button>
                </b-col>
       
            </b-row>
            <b-modal id="leave_group" title="Bist du dir sicher?">
              <b-row>
            <p>
            Du kannst nicht mehr auf das Projekt zugreifen, wenn du die Gruppe
            verlaesst.
            </p>
            </b-row>
                <b-row>
                  <b-col>
                    <b-button>Nein</b-button>
                  </b-col>
                  <b-col>
                    <b-button>Ja</b-button>
                  </b-col>
                </b-row>
            </b-modal>
            </b-container>
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
        deleteMember: function (member) {
            this.$store.dispatch('members/deleteMembers', member)

        }
        },
        computed: {
            ...mapState({
                members: state => state.members,
            })
        }

}
</script>

<style scoped>

    h1 {
        text-align: right;
    }

    
    h5 {
        text-align: right;
        float:left;
        margin: 3px;
        margin-left: 10%;
        display: inline-block; 
    }

    button {
        
       
        float: right;
    }

    .groupCard {
        
        color: black;
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