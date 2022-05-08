<template>
  <div class="profil-container">
    <div class="profil-data">
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>{{ memberProfile.title }}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td v-if="memberProfile.showEmail">{{ userData.mail }}</td>
            <td v-if="!memberProfile.showEmail">****</td>
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
    </div>
    <div class="profil-pictureContainer bg-dark">
      <b-img
        class="profil-picture"
        thumbnail
        fluid
        :src="userData.profilePictureLink"
        alt="User Picture"
      ></b-img>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("memberProfiles", ["memberProfile", "userData"]),
  },
  mounted() {
    this.$store.dispatch(
      "memberProfiles/loadMemberProfile",
      this.$route.params.user_internal_uid
    );
    this.$store.dispatch(
      "memberProfiles/loadUserFromBackend",
      this.$route.params.user_internal_uid
    );
  },
};
</script>
<style scoped>
.profil-container {
  display: flex;
}
.profil-container .profil-data {
  flex-grow: 4;
}

.profil-pictureContainer {
  /* align-self: center; */
  padding: 0.5rem;
  display: flex;
  align-items: center;
  width: 25%;
  height: 25%;
  /* height: 80%; */
}
.profil-picture {
  width: 100%;
  height: 100%;
}
</style>

