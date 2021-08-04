<template>
    <b-container >
  <b-row>
    <b-col><b-img v-bind="user" src="https://www.pngitem.com/pimgs/m/150-1503941_user-windows-10-user-icon-png-transparent-png.png" fluid alt="Fluid image"></b-img></b-col>
    
    
  </b-row>



  <b-row>
      <b-col> <strong> Name </strong> </b-col>
      <b-col> {{getUser.fullname}}</b-col> 
    
  </b-row>

  <b-row>
      

      <b-col> <strong> E-Mail </strong> </b-col>
      <b-col> {{getUser.mail}} </b-col>

      
  </b-row>

  <b-row>
      
      <b-col> <strong> Studiengang </strong> </b-col>
      <b-col> {{getProfileData.studiengang}}</b-col>
      
    
  </b-row>

  <b-row>
      <b-col> <strong> Durchgeführte Literaturreviews </strong> </b-col>
      <b-col> {{getProfileData.anzahl_literaturreviews}}</b-col>

  <br>
  <br>
  </b-row>

  <b-row>
      <b-col> <strong> Ich kenne mich mit den folgenden... aus: </strong> </b-col>
      
    
  </b-row>

  <b-row>
      <b-col> <strong> Datenbanken  </strong> </b-col>
      <b-col> {{getProfileData.datenbanken}}</b-col>
    
  </b-row>

  <b-row>
      <b-col> <strong> Referenzmanagement-Tools </strong> </b-col>
      <b-col> {{getProfileData.referenztool}}</b-col>
    
  </b-row>

  <b-row>
      <b-col> <strong> Analysetools </strong> </b-col>
      <b-col> {{getProfileData.analysetool}}</b-col>
    
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

    

    async mounted(){
        this.$store.dispatch('profile/loadProfileFromBackend')
        this.$store.dispatch('profile/loadUserFromBackend')

        //this.profileData = this.$store.state.profile.user;

        //this.profile = this.$store.state.profile.myProfile[this.findIndex()]
        //this.myProfile = this.$store.state.profile.myProfile

        
    },

    computed: {

        

        getProfileData() {
        // return true
        return this.$store.state.profile.profileData
        },

        getUser() {
        return this.$store.state.profile.userData

        } 




      
       
        
    }
  }
</script>