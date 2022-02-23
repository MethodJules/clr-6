<template>
  <div class="profil-container">
    <b-container v-if="getUserRole != 'lecturer'">
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {{ getUser.fullname }}
            </td>
          </tr>
          <tr v-if="memberProfile.showEmail">
            <th scope="row">Email</th>
            <td>{{ getUser.mail }}</td>
          </tr>
          <tr>
            <th scope="row">Studiengang</th>
            <td>{{ memberProfile.studiengang }}</td>
          </tr>
          <tr>
            <th scope="row">Durchgeführte Literaturreviews</th>
            <td>{{ memberProfile.anzahlLiteraturreviews }}</td>
          </tr>
          <tr>
            <th scope="row">Ich kenne mich mit den folgenden... aus:</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Datenbanken</th>
            <td>{{ memberProfile.datenbanken }}</td>
          </tr>
          <tr>
            <th scope="row">Referenzmanagement-Tools</th>
            <td>{{ memberProfile.referenztool }}</td>
          </tr>
          <tr>
            <th scope="row">Analysetools</th>
            <td>{{ memberProfile.analysetool }}</td>
          </tr>
        </tbody>
      </table>
    </b-container>

    <b-container v-if="getUserRole == 'lecturer'">
      <b-row>
        <b-col><b-img v-bind="user" :src="getImage"> </b-img></b-col>
      </b-row>
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {{ getUser.fullname }}
            </td>
          </tr>
          <tr>
            <th scope="row">Abteilung</th>
            <td>{{ memberProfile.abteilung }}</td>
          </tr>
          <tr v-if="memberProfile.showEmail">
            <th scope="row">Email</th>
            <td>{{ getUser.mail }}</td>
          </tr>
          <tr v-if="memberProfile.showPhoneNumber">
            <th scope="row">Telefonnummer</th>
            <td>{{ memberProfile.telefonnummer }}</td>
          </tr>
          <tr>
            <th scope="row">Betreute Projekte</th>
            <td>
              <li
                v-for="(project, i) in getMyProjectlist"
                :key="i"
                class="mb-1"
              >
                {{ project.title }}
              </li>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: { class: "m1" },
    };
  },
  computed: {
    ...mapGetters({
      memberProfile: "profile/getProfileData",
      userUID: "drupal_api/getCurrentUserInternalUID",
    }),
    getUser() {
      return this.$store.state.profile.userData;
    },
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },
    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },

    getImage() {
      return this.$store.state.profile.imageData;
    },
  },
  mounted() {
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.$route.params.user_internal_uid
    );
  },
};
</script>
<style scoped>
.profil-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  width: 100%;
}
</style>
