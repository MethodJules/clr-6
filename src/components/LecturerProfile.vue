<template>
  <b-container>
    <b-row>
      <!-- <b-col><b-img v-bind="user" :src="getImage"> </b-img></b-col> -->
    </b-row>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>
            {{ profile.title }}
          </td>
        </tr>
        <tr>
          <th scope="row">Abteilung</th>
          <td>{{ profile.abteilung }}</td>
        </tr>
        <tr v-if="profile.showEmail">
          <th scope="row">Email</th>
          <td>{{ getUser.mail }}</td>
        </tr>
        <tr v-if="profile.showPhoneNumber">
          <th scope="row">Telefonnummer</th>
          <td>{{ profile.telefonnummer }}</td>
        </tr>
        <tr>
          <th scope="row">Betreute Projekte</th>
          <td>
            <li v-for="(project, i) in getMyProjectlist" :key="i" class="mb-1">
              {{ project.title }}
            </li>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      profile: "memberProfiles/getMemberProfile",
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
      "memberProfiles/loadMemberProfile",
      this.$route.params.user_internal_uid
    );
  },
};
</script>
