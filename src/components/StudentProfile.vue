<template>
  <div class="profil-container">
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>{{ profile.title }}</td>
        </tr>
        <tr>
          <th scope="row">Email</th>
          <td v-if="profile.showEmail">{{ userData.mail }}</td>
          <td v-if="!profile.showEmail">****</td>
        </tr>
        <tr>
          <th scope="row">Studiengang</th>
          <td>{{ profile.studiengang }}</td>
        </tr>
        <tr>
          <th scope="row">Durchgeführte Literaturreviews</th>
          <td>{{ profile.anzahlLiteraturreviews }}</td>
        </tr>
        <tr>
          <th scope="row">Ich kenne mich mit den folgenden... aus:</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">Datenbanken</th>
          <td>{{ profile.datenbanken }}</td>
        </tr>
        <tr>
          <th scope="row">Referenzmanagement-Tools</th>
          <td>{{ profile.referenztool }}</td>
        </tr>
        <tr>
          <th scope="row">Analysetools</th>
          <td>{{ profile.analysetool }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      profile: "memberProfiles/getMemberProfile",
      userData: "memberProfiles/getUserData",
    }),
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

