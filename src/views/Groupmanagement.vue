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
            <b-nav-item
              :to="{
                name: 'Profil',
                params: {
                  user_internal_uid: mitglied.internal_uid,
                },
              }"
              >{{ mitglied.username }}</b-nav-item
            >
          </b-col>
          <b-col>
            <b-button
              v-if="(getCurrentUserID != mitglied.userid) & currentUserisAdmin"
              variant="link"
              @click="deleteMember(mitglied)"
            >
              <b-icon icon="x"></b-icon>
            </b-button>
            <b-button
              v-if="(getCurrentUserID != mitglied.userid) & currentUserisAdmin"
              variant="link"
              @click="giveAdminRights(mitglied)"
              ><b-icon icon="flag-fill"></b-icon
            ></b-button>
            <br />
          </b-col>
        </b-row>
      </div>

      <div v-for="admin in getGroupAdmins" :key="admin.userid">
        <b-row>
          <b-col>
            <h5>Gruppenadministrator</h5>
          </b-col>
          <b-col>
            <b-nav-item
              :to="{
                name: 'Profil',
                params: {
                  user_internal_uid: admin.internal_uid,
                },
              }"
              >{{ admin.username }}</b-nav-item
            >
            <!--            <h5>{{ admin.username }}</h5> -->
          </b-col>
          <b-col>
            <b-button
              variant="link"
              v-if="(getCurrentUserID != admin.userid) & currentUserisAdmin"
              @click="deleteAdmin(admin)"
            >
              <b-icon icon="x"></b-icon>
            </b-button>
            <br />
          </b-col>
        </b-row>
      </div>
      <br />

          <b-row class="groupmanagement-buttons">
            <b-button
            :to="{ name: 'NewMember' }" tag="div">
                Neues Mitglied hinzufügen
              
            </b-button>
         
            <b-button @click="removeOwnAdminRights"
              >Admin-Rechte entfernen
            </b-button>
          
            <b-button @click="$bvModal.show('modal-scoped')"
              >Gruppe verlassen
            </b-button>
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
    /* checks if current user is in group admin array, because he needs the rights to remove another member.
    then sends dispatch to delete member*/
    deleteMember: function (mitglied) {
      //let role_field = "field_gruppenmitglieder";
      if (this.currentUserisAdmin) {
        alert("Das Gruppenmitglied wurde gelöscht");
        this.$store.dispatch("project/deleteMembers", mitglied);
      } else {
        alert(
          "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
        );
      }

      //this.$store.dispatch("project/deleteMembers", { mitglied, role_field });
    },

    /* checks if current user is in group admin array, because he needs the rights to remove another member.
    then sends dispatch to delete admin*/
    deleteAdmin: function (mitglied) {
      //if(me=gruppenadministrator AND nicht selbst letzte admin)
      if (this.currentUserisAdmin) {
        this.$store.dispatch("project/deleteAdmin", mitglied);
      } else {
        alert(
          "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
        );
      }
    },

    filter(memberId, memberList) {
      //filters the current user by id - is used in a function for leaving the group
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
        this.$store.dispatch("project/deleteMembers", member).then(() => {
          this.$bvToast.toast(`Du hast die Gruppe verlassen`, {
            title: "Du hast die Gruppe verlassen",
            autoHideDelay: 4000,
            variant: "warning",
          });
        });
        this.$store.dispatch("project/loadProjectsFromBackend");
        this.$router.push("/");
      }

      if (this.currentUserisAdmin) {
        if (this.getGroupAdmins.length < 2) {
          alert(
            "Mache erst ein anderes Gruppenmitglied zu einem Gruppenadministrator, bevor du die Gruppe verlässt. Falls du die letzte Person in der Gruppe bist, entferne deine Gruppenadministrator-Rechte bevor du die Gruppe verlässt "
          );
        } else {
          console.log("admin funzt");
          member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
          this.$store.dispatch("project/deleteAdmin", member).then(() => {
            this.$bvToast.toast(`Du hast die Gruppe verlassen`, {
              title: "Du hast die Gruppe verlassen",
              autoHideDelay: 4000,
              variant: "warning",
            });
          });
          this.$store.dispatch("project/loadProjectsFromBackend");
          this.$router.push("/");
        }
      }
      //this.$store.dispatch("project/deleteMembers", userID);

      //go to Projectlist
    },

    giveAdminRights: function (new_admin) {
      let member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
      //evtl redundant?
      if (this.currentUserisAdmin) {
        //first add new admin
        this.$store
          .dispatch("project/addMember", {
            mitglied: new_admin,
            role: "field_gruppenadministrator",
          })
          .then(() => {
            //then delete old group member
            //sometimes the member is not deleted
            //do a .then for the second dispatch?
            this.$store.dispatch("project/deleteMembers", new_admin);
          });
      } else {
        alert(
          "Du musst Gruppenadministrator sein, um andere Gruppenmitglieder zu Gruppenadministratoren zu befördern"
        );
      }
    },

    removeOwnAdminRights: function () {
      //TODO: make only possible if there is at least one other admin
      //if letzter admin und noch ein grp mitglied außer system da , dann erst admin an anderen vergeben
      let member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
      //evtl redundant?
      if (this.currentUserisAdmin) {
        //if user ist letzter admin and there are still groupmembers left, user has to promote someone first. otherwise the group has no admins left but there are still other group members left
        if (this.getGroupMembers.length > 0 && this.getGroupAdmins.length < 2) {
          alert(
            "Du musst erst ein anderes Gruppenmitglied zum Gruppenadministrator machen, um deine Administratorrechte aufzugeben"
          );
        } else {
          member = this.filter(this.getCurrentUserID, this.getGroupAdmins);
          //first delete user in groupadmin array
          this.$store.dispatch("project/deleteAdmin", member);
          //then add in groupmember array
          this.$store.dispatch("project/addMember", {
            mitglied: member,
            role: "field_gruppenmitglieder",
          });
          //then delete old group member
          alert("Du bist nun kein Gruppenadministrator mehr");
        }
      } else {
        alert(
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
      return this.$store.state.profile.userData.uuid;
    },

    getCurrentUserInternalUID() {
      return this.$store.state.drupal_api.user.uid;
    },
    // checks if current user is a group administrator by looking for the currentuserid in group admin array
    //needed for some actions like adding and removing members
    currentUserisAdmin() {
      return this.getGroupAdmins.some(
        (e) => e.userid === this.getCurrentUserID
      );
    },
  },

  async mounted() {
    this.$store.dispatch("user/loadStudentsFromBackend");
    this.$store.dispatch(
      "profile/loadUserFromBackend",
      this.getCurrentUserInternalUID
    );
    this.$store.dispatch(
      "project/loadCurrentProject",
      this.$route.params.project_id
    );
  },
};
</script>



<style scoped>
.groupmanagement-buttons {
  display: flex;
  justify-content: center;
}
.groupmanagement-buttons * {
  margin-right: 1rem;
  margin-bottom: 1rem;
  max-width: 15rem;
}
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