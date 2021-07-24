<template>
    <b-container >
  <b-row>
    <b-col><b-img v-bind="user" src="https://www.pngitem.com/pimgs/m/150-1503941_user-windows-10-user-icon-png-transparent-png.png" fluid alt="Fluid image"></b-img></b-col>
    
    
  </b-row>



  <b-row>
      <b-col> <strong> Name </strong> </b-col>
      <b-col> </b-col>
    
  </b-row>

  <b-row>
      
      <b-col> <strong> Studiengang </strong> </b-col>
      <b-col> {{getProfileData[0].studiengang}}</b-col>
      
    
  </b-row>

  <b-row>
      <b-col> <strong> Durchgeführte Literaturreviews </strong> </b-col>
      <b-col> {{getProfileData[0].anzahl_literaturreviews}}</b-col>

  <br>
  <br>
  </b-row>

  <b-row>
      <b-col> <strong> Ich kenne mich mit den folgenden... aus: </strong> </b-col>
      
    
  </b-row>

  <b-row>
      <b-col> <strong> Datenbanken  </strong> </b-col>
      <b-col> {{getProfileData[0].datenbanken}}</b-col>
    
  </b-row>

  <b-row>
      <b-col> <strong> Referenzmanagement-Tools </strong> </b-col>
      <b-col> {{getProfileData[1].referenztool}}</b-col>
    
  </b-row>

  <b-row>
      <b-col> <strong> Analysetools </strong> </b-col>
      <b-col> {{getProfileData[1].analysetool}}</b-col>
    
  </b-row>
</b-container>
</template>

<script>

  export default {
    
    
    data() {
    //var rightIndex
      return {
        user: { width: 200, height: 200, class: 'm1' },
        //profileId: this.$route.params.profile_id,
        //rightIndex
      }
    },

    /* methods: {

        findIndex(){
            let rightIndex = 0
            for(let i=0; i< this.$store.state.profile.myProfile.length; i++){
                if(this.$route.params.profile_id === this.$store.state.profile.myProfile[i].idd){
                    rightIndex = i
                }
            }
           
            return rightIndex
        },

    },  */

    

    mounted(){
        this.$store.dispatch('profile/loadProfileFromBackend')
        //this.profile = this.$store.state.profile.myProfile[this.findIndex()]
        //this.myProfile = this.$store.state.profile.myProfile

        
    },

    computed: {

        

        getProfileData() {
        // return true
        return this.$store.state.profile.profileData
    }


        /* studiengang: {
            get() {
                return this.$store.state.studiengang;
            },
            set(value) {
                this.$store.commit('setStudiengang', value);
            }
        },

        anzahl_literaturreviews: {
            get() {
                return this.$store.state.anzahl_literaturreviews;
            },
            set(value) {
                this.$store.commit('setAnzahl_literaturreviews', value);
            }
        },
        datenbanken: {
            get() {
                return this.$store.state.datenbanken;
            },
            set(value) {
                this.$store.commit('setDatenbanken', value);
            }
        },
        referenztool: {
            get() {
                return this.$store.state.referenztool;
            },
            set(value) {
                this.$store.commit('setReferenztool', value);
            }
        },
        analysetool: {
            get() {
                return this.$store.state.analysetool;
            },
            set(value) {
                this.$store.commit('setAnalysetool', value);
            }
        }, */
    }
  }
</script>