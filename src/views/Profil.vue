<template>
  <div class="profil-container">
    <b-container v-if="user.role != 'lecturer'">
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {{ userDate.fullname }}
            </td>
          </tr>
          <tr v-if="profileData.showEmail">
            <th scope="row">Email</th>
            <td>{{ userDate.mail }}</td>
          </tr>
          <tr>
            <th scope="row">Studiengang</th>
            <td>{{ profileData.studiengang }}</td>
          </tr>
          <tr>
            <th scope="row">Durchgeführte Literaturreviews</th>
            <td>{{ profileData.anzahlLiteraturreviews }}</td>
          </tr>
          <tr>
            <th scope="row">Ich kenne mich mit den folgenden... aus:</th>
            <td></td>
          </tr>
          <tr>
            <th scope="row">Datenbanken</th>
            <td>{{ profileData.datenbanken }}</td>
          </tr>
          <tr>
            <th scope="row">Referenzmanagement-Tools</th>
            <td>{{ profileData.referenztool }}</td>
          </tr>
          <tr>
            <th scope="row">Analysetools</th>
            <td>{{ profileData.analysetool }}</td>
          </tr>
        </tbody>
      </table>
    </b-container>

    <b-container v-if="user.role == 'lecturer'">
      <b-row>
        <b-col><b-img v-bind="user" :src="imageData"> </b-img></b-col>
      </b-row>
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {{ userDate.fullname }}
            </td>
          </tr>
          <tr>
            <th scope="row">Abteilung</th>
            <td>{{ profileData.abteilung }}</td>
          </tr>
          <tr v-if="profileData.showEmail">
            <th scope="row">Email</th>
            <td>{{ userDate.mail }}</td>
          </tr>
          <tr v-if="profileData.showPhoneNumber">
            <th scope="row">Telefonnummer</th>
            <td>{{ profileData.telefonnummer }}</td>
          </tr>
          <tr>
            <th scope="row">Betreute Projekte</th>
            <td>
              <li v-for="(project, i) in myProjects" :key="i" class="mb-1">
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: { class: "m1" },
    };
  },
  computed: {
    ...mapState("drupal_api", ["user"]),
    ...mapState("project", ["myProjects"]),
    ...mapState("profile", ["userData", "profileData", "imageData"]),
  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem("current_user"));
    const drupalUserUID = user.uid;
    this.$store.dispatch("profile/loadUserFromBackend", drupalUserUID);
    this.$store.dispatch("profile/loadProfileFromBackend", drupalUserUID);
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
.container {
  width: 80%;
}
</style>
