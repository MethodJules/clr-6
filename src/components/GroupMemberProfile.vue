<template>
  <div class="profil-container">
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>{{ memberProfile.title }}</td>
        </tr>
        <tr>
          <th scope="row">Email</th>
          <td v-if="memberProfile.showEmail">{{}}</td>
          <td v-if="!memberProfile.showEmail">****</td>
        </tr>
        <tr>
          <th scope="row">Telefonnummer</th>
          <td v-if="memberProfile.showPhoneNumber">
            {{ memberProfile.telefonnummer }}
          </td>
          <td v-if="!memberProfile.showPhoneNumber">****</td>
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
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      memberProfile: "memberProfiles/getMemberProfile",
    }),
  },
  mounted() {
    // console.log(this.route.params);
    this.$store.dispatch(
      "memberProfiles/loadMemberProfile",
      this.$route.params.user_internal_uid
    );
  },
};
</script>

