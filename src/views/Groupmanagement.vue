<template>
    <div class="home">
        <b-container>
        <b-row>
        <h2> Projektgruppe </h2>
        </b-row>
        <br>
        
      
        <div class="groupCard" v-for="(member, index) in members.members" :key="index">
            <b-row>
                <h5>{{member.name}}</h5>
            </b-row>
                <b-button @click="deleteMember(member)"> X </b-button>
                <br />
                <h5>{{member.role}}</h5>
            
        </div>
        

        <br>

        
        <b-row>
                <b-col col="2">
                </b-col>
                <b-col col="3">
                <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')"> Neues Mitglied Hinzufügen </b-button>
                </b-col>
                <b-col col="3">
                     <b-button>Admin-Rechte entfernen</b-button>
                </b-col>
                <b-col col="3">
                     <b-button v-b-modal.leave_group>Gruppe verlassen</b-button>
                </b-col>
                <b-col col="2">
                </b-col>
                
            </b-row>
            <b-modal id="leave_group" title="Bist du dir sicher?">
                <b-row>
                    <p>Du kannst nicht mehr auf das Projekt zugreifen, wenn du die Gruppe verlaesst.</p>
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
        

        
                
        <b-modal id="bv-modal-example" hide-footer>
                <template #modal-title>
                   Gruppenmitglieder hinzufügen
                </template>

                
                    
                <label for="input-with-list">Benutzer/in suchen </label>
                        <div container>
                        <b-form-input list="input-list" v-model = "newMember" id="input-with-list"> </b-form-input>
                        
                        <b-form-datalist id="input-list" :options="options"></b-form-datalist>
                        </div>

                        
                        <b-button @click="$bvModal.hide('bv-modal-example')">Abbrechen</b-button>
                        <b-button @click="speichern()">
                        Speichern
                        </b-button>
                   
                    
                   
                
        </b-modal>
        </b-container>
    </div>
</template>

<script>

import { mapState } from 'vuex';


    export default {
    name: 'Home',
    components: {},
    data() {
        return {
            options: ['Max', 'Person', 'Schuh'],
            member: '',
            role: '',
            
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
        },

        speichern () {
            
            var member = {
                name: this.member.name,
                role: this.member.role,
               
            }

             this.members.push(member)

             this.newMember = ''

           

           

            this.$store.dispatch('members/addMember', member)

            this.$router.push({ name: 'Groupmanagement'})

            
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
        
       
        float: right;
    }

    .groupCard {
       
        
        margin: 5px;
        width: 30%;
        text-align: center;
    }

    .card {
        display: inline-block;
    }

    

</style>