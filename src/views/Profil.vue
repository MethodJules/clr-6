<template>
<!-- All the profile data of the user, who put his profile data in the input fields in the component "Einstellungen" and the user data,
are shown here as a profile view and if the user has uploaded a profile picture in the "Einstellungen", it will also be shown here -->
    <b-container >
  <b-row>
    <b-col><b-img v-bind="user" src="public://pictures/2021-08/Testacc Profile Picture.jpg" fluid alt="Fluid image"></b-img></b-col>
    
    
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
    
      return {
        user: { width: 200, height: 200, class: 'm1' },
        //profileId: this.$route.params.profile_id,
        
      }
    },

     
    
    /** load the profile data and the user data from backend */

    async mounted(){
        this.$store.dispatch('profile/loadProfileFromBackend')
        this.$store.dispatch('profile/loadUserFromBackend')


        
    },

     /* With the getters, we can show the loading data from the backend, that it can be visible in the frontend for the users */

    computed: {

        

        getProfileData() {
        
        return this.$store.state.profile.profileData
        },

        getUser() {
        return this.$store.state.profile.userData

        } 




      
       
        
    }
  }
</script>