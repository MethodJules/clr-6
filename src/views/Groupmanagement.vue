<template>
  <div class="home">
    <b-row>
      <h2>{{ getCurrentProject.title }}</h2>
    </b-row>
    <br />

    <div>
      <div
        v-for="mitglied in getCurrentProject.gruppenmitglieder"
        :key="mitglied.userid"
      >
        <b-row>
          <b-col>
            <h5>Gruppenmitglied</h5>
          </b-col>
          <b-col>
            <h5>{{ mitglied.username }}</h5>
          </b-col>
          <b-col>
            <b-button @click="deleteMember(mitglied)"> X </b-button>
            <br />
          </b-col>
        </b-row>
      </div>

      <div v-for="admin in getGroupAdmins" :key="admin.userid">
        <b-row>
          <b-col>
            <h5>Gruppenadmin</h5>
          </b-col>
          <b-col>
            <h5>{{ admin.username }}</h5>
          </b-col>
          <b-col>
            <b-button @click="deleteAdmin(member)"> X </b-button>
            <br />
          </b-col>
        </b-row>
      </div>
      <br />

      <b-container>
        <b-row>
          <b-col>
            <b-button>
              <router-link to="newMember" tag="div">
                Neues Mitglied hinzufügen
              </router-link>
            </b-button>
          </b-col>
          <b-col>
            <b-button>Admin-Rechte entfernen</b-button>
          </b-col>
          <b-col>
            <b-button v-b-modal.leave_group>Gruppe verlassen</b-button>
          </b-col>
        </b-row>
        <!--         <b-modal
          id="leave_group"
          title="Bist du dir sicher?"
          cancel-title="Abbrechen"
        >
        </b-modal> -->

        <b-button @click="$bvModal.show('modal-scoped')"
          >Gruppe verlassen
        </b-button>
        <b-modal id="modal-scoped" title="Bist du dir sicher?">
          <template #modal-footer="{ cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
            <b-button size="sm" variant="success" @click="leaveGroup()">
              OK
            </b-button>
          </template>
        </b-modal>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    addMember: function (mitglied) {
      //let role_field = "field_gruppenmitglieder";
      this.$store.dispatch("project/addMembers", mitglied);
      //this.$store.dispatch("project/deleteMembers", { mitglied, role_field });
    },
    deleteMember: function (mitglied) {
      //let role_field = "field_gruppenmitglieder";
      if (this.getGroupAdmins.some((e) => e.userid === this.getCurrentUserID)) {
        console.log("Member gelöscht popup");
        this.$store.dispatch("project/deleteMembers", mitglied);
      } else {
        console.log(
          "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
        );
      }

      //this.$store.dispatch("project/deleteMembers", { mitglied, role_field });
    },

    deleteAdmin: function (mitglied) {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      if (this.getGroupAdmins.some((e) => e.userid === this.getCurrentUserID)) {
        console.log("Member gelöscht popup");
        this.$store.dispatch("project/deleteMembers", mitglied);
      } else {
        console.log(
          "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
        );
      }
    },

    filter(memberId, memberList) {
      //filters the current user by id - is used in a function for leaving the group
      console.log("test");
      let filteredCollection = memberList.filter((item) => {
        console.log(item);
        if (item.userid == memberId) {
          return true;
        }
        return false;
      });
      //console.log(filteredCollection);
      //a user should exist only once, so first index should return the user correctly
      return filteredCollection[0];
    },

    /* checks first if current user is an group admin or group member with getGroup__.some. is a user in one of those arrays
the filter function will filter out the correct member out of the array
then the appropriate dispatch will be sent */
    leaveGroup() {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      //this.$store.dispatch("members/deleteMembers", mitglied);
      //put logic in project.js?

      let member;

      if (
        this.getGroupMembers.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        console.log("member funzt");
        member = this.filter(this.getCurrentUserID, this.getGroupMembers);
        console.log(member);
        this.$store.dispatch("project/deleteMembers", member);
      }

      if (this.getGroupAdmins.some((e) => e.userid === this.getCurrentUserID)) {
        console.log("admin funzt");
        member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
        //this.$store.dispatch("project/deleteMembers", member);
      }
      //this.$store.dispatch("project/deleteMembers", userID);

      //go to Projectlist
    },

    giveAdminRights: function (mitglied) {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      let role_field = "field_gruppenadministrator";
      //this.$store.dispatch("members/deleteMembers", mitglied);
      this.$store.dispatch("project/deleteMembers", { mitglied, role_field });
    },

    removeOwnAdminRights: function (mitglied) {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      let role_field = "field_gruppenadministrator";
      //this.$store.dispatch("members/deleteMembers", mitglied);
      this.$store.dispatch("project/deleteMembers", { mitglied, role_field });
    },
  },
  computed: {
    ...mapState({
      members: (state) => state.members,
    }),
    getCurrentProject() {
      return this.$store.state.project.currentProject;
    },
    getGroupMembers() {
      return this.$store.state.project.currentProject.gruppenmitglieder;
    },
    getGroupAdmins() {
      return this.$store.state.project.currentProjectGroupAdmins;
    },
    getProjectLecturers() {
      return this.$store.state.project.currentProjectLecturers;
    },
    getCurrentUserID() {
      return this.$store.state.profile.userData.idd;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: right;
}

h5 {
  text-align: right;
  float: left;
  margin: 3px;
  margin-left: 10%;
  display: inline-block;
}

button {
  float: right;
}

.groupCard {
  color: black;
  margin: 5px;
  width: 30%;
  text-align: center;
}

.card {
  display: inline-block;
}

img {
  width: 60%;
}
</style>