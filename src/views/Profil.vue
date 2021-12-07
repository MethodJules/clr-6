<template>
  <!-- All the profile data of the user, who put his profile data in the input fields in the component "Einstellungen" and the user data,
are shown here as a profile view and if the user has uploaded a profile picture in the "Einstellungen", it will also be shown here -->
  <div>
    <b-container v-if="getUserRole != 'lecturer'">
      <b-row>
        <b-col><b-img v-bind="user" :src="getImage"> </b-img></b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Name </strong> </b-col>
        <b-col> {{ getUser.fullname }}</b-col>
      </b-row>

      <b-row v-if="getProfileData.show_email">
        <b-col> <strong> E-Mail </strong> </b-col>
        <b-col> {{ getUser.mail }} </b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Studiengang </strong> </b-col>
        <b-col> {{ getProfileData.studiengang }}</b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Durchgeführte Literaturreviews </strong> </b-col>
        <b-col> {{ getProfileData.anzahl_literaturreviews }}</b-col>

        <br />
        <br />
      </b-row>

      <b-row>
        <b-col>
          <strong> Ich kenne mich mit den folgenden... aus: </strong>
        </b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Datenbanken </strong> </b-col>
        <b-col> {{ getProfileData.datenbanken }}</b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Referenzmanagement-Tools </strong> </b-col>
        <b-col> {{ getProfileData.referenztool }}</b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Analysetools </strong> </b-col>
        <b-col> {{ getProfileData.analysetool }}</b-col>
      </b-row>
    </b-container>

    <b-container v-if="getUserRole == 'lecturer'">
      <b-row>
        <b-col><b-img v-bind="user" :src="getImage"> </b-img></b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Name </strong> </b-col>
        <b-col> {{ getUser.fullname }}</b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Abteilung </strong> </b-col>
        <b-col> {{ getProfileData.abteilung }}</b-col>
      </b-row>

      <b-row v-if="getProfileData.show_email">
        <b-col> <strong> E-Mail </strong> </b-col>
        <b-col> {{ getUser.mail }} </b-col>
      </b-row>

      <b-row v-if="getProfileData.show_phone_number">
        <b-col> <strong> Telefon </strong> </b-col>
        <b-col> {{ getProfileData.telefonnummer }} </b-col>
      </b-row>

      <b-row>
        <b-col> <strong> Betreute Projekte </strong> </b-col>
        <b-col>
          <li v-for="(project, i) in getMyProjectlist" :key="i" class="mb-1">
            {{ project.title }}
          </li>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { class: "m1" },
      //profileId: this.$route.params.profile_id,
    };
  },

  /** load the profile data and the user data from backend */

  async mounted() {
    this.$store.dispatch(
      "profile/loadProfileFromBackend",
      this.getUserInternalUID
    );
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.getUserInternalUID
    );
  },

  /* With the getters, we can show the loading data from the backend, that it can be visible in the frontend for the users */

  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },

    getProfileData() {
      return this.$store.state.profile.profileData;
    },

    getUser() {
      return this.$store.state.profile.userData;
    },

    getImage() {
      return this.$store.state.profile.imageData;
    },
    //here getCurrentUserInternalUID returns the uid provided by the params -> this is because profiles of other students should also be visitable
    getUserInternalUID() {
      return this.$route.params.user_internal_uid;
    },
  },
};
</script>