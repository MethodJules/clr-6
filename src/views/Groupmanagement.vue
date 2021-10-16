<template>
  <div class="home">
    <b-row>
      <h2>{{ getCurrentProject.title }}</h2>
    </b-row>
    <br />

    <div>
      <div v-for="mitglied in getGroupMembers" :key="mitglied.userid">
        <b-row>
          <b-col>
            <h5>Gruppenmitglied</h5>
          </b-col>
          <b-col>
            <h5>{{ mitglied.username }}</h5>
          </b-col>
          <b-col>
            <b-button @click="deleteMember(mitglied)"> X </b-button>
            <b-button variant="link" @click="giveAdminRights(mitglied)"
              ><b-icon icon="flag-fill"></b-icon
            ></b-button>
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
            <b-button @click="deleteAdmin(admin)"> X </b-button>
            <br />
          </b-col>
        </b-row>
      </div>
      <br />

      <b-container>
        <b-row>
          <b-col>
            <b-button>
              <router-link :to="{ name: 'NewMember' }" tag="div">
                Neues Mitglied hinzufügen
              </router-link>
            </b-button>
          </b-col>
          <b-col>
            <b-button @click="removeOwnAdminRights"
              >Admin-Rechte entfernen
            </b-button>
          </b-col>
          <b-col>
            <b-button @click="$bvModal.show('modal-scoped')"
              >Gruppe verlassen
            </b-button>
          </b-col>
        </b-row>

        <!--  <b-button v-b-modal.leave_group>Gruppe verlassen</b-button>       
        <b-modal
          id="leave_group"
          title="Bist du dir sicher?"
          cancel-title="Abbrechen"
        >
        </b-modal> -->

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
    /* checks if current user is in group admin array, because he needs the rights to remove another member.
    then sends dispatch to delete member*/
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

    /* checks if current user is in group admin array, because he needs the rights to remove another member.
    then sends dispatch to delete admin*/
    deleteAdmin: function (mitglied) {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      if (this.getGroupAdmins.some((e) => e.userid === this.getCurrentUserID)) {
        this.$store.dispatch("project/deleteAdmin", mitglied);
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

    /* checks first if current user is an group admin or group member with getGroup__.some. If a user in one of those arrays
the filter function will filter out the correct member out of the array
then the appropriate dispatch will be sent */
    leaveGroup() {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      //this.$store.dispatch("members/deleteMembers", mitglied);
      //put logic in project.js?
      //TODO: either cant leave if last admin except no other member is in grp
      // or has to give up grp admin role first, but giving up grp admin rights should not be possible, if there is no other admin, but grp members are still there

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

      if (
        this.getGroupAdmins.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        console.log("admin funzt");
        member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
        this.$store.dispatch("project/deleteAdmin", member).then(() => {
          this.$bvToast.toast(`Du hast die Gruppe verlassen`, {
            title: "Du hast die Gruppe verlassen",
            autoHideDelay: 4000,
            variant: "warning",
          });
        });
        this.$router.push("/");
      }
      //this.$store.dispatch("project/deleteMembers", userID);

      //go to Projectlist
    },

    giveAdminRights: function (new_admin) {
      let member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
      //evtl redundant?
      if (
        this.getGroupAdmins.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        //first add new admin
        this.$store.dispatch("project/addMember", {
          mitglied: new_admin,
          role: "field_gruppenadministrator",
        });
        //then delete old group member
        this.$store.dispatch("project/deleteMembers", member);
      } else {
        console.log(
          "Du musst Gruppenadministrator sein, um andere Gruppenmitglieder zu Gruppenadministratoren zu befördern"
        );
      }
    },

    removeOwnAdminRights: function () {
      //TODO: make only possible if there is at least one other admin
      let member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
      //evtl redundant?
      if (
        this.getGroupAdmins.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
        //first delete user in groupadmin array
        this.$store.dispatch("project/deleteAdmin", member);
        //then add in groupmember array
        this.$store.dispatch("project/addMember", {
          mitglied: member,
          role: "field_gruppenmitglieder",
        });
        //then delete old group member
      } else {
        console.log(
          "Du musst Gruppenadministrator sein, um deine Administratorrechte aufgeben zu können"
        );
      }
    },
  },
  computed: {
    ...mapState({
      members: (state) => state.members,
    }),
    getCurrentProject() {
      return this.$store.state.project.currentProject;
    },
    /*filters static groupmember out(same person in all groups), who  has to be included because, of error shown here https://www.drupal.org/project/drupal/issues/3072384
    without this groupmember a user who is 'only' groupadministrator in a group does not get this group from a get request*/
    getGroupMembers() {
      let unfiltered_members =
        this.$store.state.project.currentProject.gruppenmitglieder;
      return unfiltered_members.filter(function (member) {
        //TODO: change the filter criterium to match the static groupmember -> static user in backend has the name "System"
        return member.username != "System";
      });
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