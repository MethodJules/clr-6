<template>
  <div class="profil-container">
    <div class="profil-data">
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>
              {{ memberProfile.title }}
            </td>
          </tr>
          <tr>
            <th scope="row">Abteilung</th>
            <td>{{ memberProfile.abteilung }}</td>
          </tr>
          <tr v-if="memberProfile.showEmail">
            <th scope="row">Email</th>
            <td>{{ userData.mail }}</td>
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

    getMyProjectlist() {
      return this.$store.state.project.myProjects;
    },
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
  padding: 0.5rem;
  display: flex;
  align-items: center;
  width: 25%;
  height: 25%;
}
.profil-picture {
  width: 100%;
  height: 100%;
}
</style>
