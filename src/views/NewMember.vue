<template>
  <div class="home">
    <h2>Gruppenmitglied hinzufügen</h2>
    <b-form @submit.prevent="save">
      <div class="form-group">
        Benutzer:
        <!-- <label for="input-with-list"></label> -->
        <!--                 <div container>
                <input list="input-list"
                       id=""
                       class="form-input"
                       v-model="member"
                       placeholder="Benutzer*in suchen"
                       
                       
                       />
                <b-form-datalist id="input-list" :options="options"></b-form-datalist>
                </div> -->
        <select v-model="member" class="form-control">
          <option
            v-for="student in getStudents"
            v-bind:value="student"
            v-bind:key="student.uuid"
          >
            {{ student.name }}
          </option>
        </select>

        Rolle:
        <!-- <label for="input-with-list"></label> -->
        <div container>
          <!--           <input
            list="input-list"
            id=""
            class="form-input"
            v-model="roles"
            placeholder="Benutzer*in suchen"
          />
          <b-form-datalist id="input-list" :options="roles"></b-form-datalist> -->
          <select v-model="role" class="form-control">
            <option
              v-for="role in roles"
              v-bind:value="role.value"
              v-bind:key="role.value"
            >
              {{ role.text }}
            </option>
          </select>
        </div>

        <!--         Rolle:
        <input name="" id="" class="form-input" v-model="role" /> -->
      </div>

      <b-container>
        <b-row>
          <b-col>
            <b-button @click="save()">Speichern</b-button>
          </b-col>
          <b-col> </b-col>
          <b-col> </b-col>
          <b-col>
            <b-button
              :to="{
                name: 'Groupmanagement',
                params: {
                  project_id: this.$route.params.project_id,
                },
              }"
              >Abbrechen</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      member: null,
      role: "",
      roles: [
        { value: "field_gruppenadministrator", text: "Gruppenadministrator" },
        { value: "field_gruppenmitglieder", text: "Gruppenmitglied" },
      ],
    };
  },
  methods: {
    save() {
      //gmake new object with new attribute names, so that it matches with the other existing membbers in 'Gruppenmanagement'
      //the list in 'Gruppenmanagement' comes from project.gruppenmitglieder and has other attributes than the member list here, which comes from 'getStudents',
      // TODO: change attribute names in LOAD_CURRENT_PROJECT so that both list entries match?
      const new_member = {
        username: this.member.name,
        userid: this.member.uuid,
      };
      //if current user is in group member array, he cant be a group admin -> current user is not allowed to add a member
      if (
        this.getGroupMembers.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        alert(
          "Du musst Gruppenadministrator sein, um neue Gruppenmitglieder hinzufügen zu können"
        );
      }
      // if current user is in group admin array, he can add another user to the group
      // TODO: maybe check if user is not in groupadmins as well, in case of unforseeable errors
      else if (
        this.getGroupAdmins.some(
          (member) => member.userid === this.getCurrentUserID
        )
      ) {
        //if new user is already in the group (is in member or admin array) he cant be added again
        if (
          this.getGroupAdmins.some((e) => e.userid === new_member.userid) ||
          this.getGroupMembers.some((e) => e.userid === new_member.userid)
        ) {
          alert("Dieser Nutzer ist bereits Teil deiner Gruppe.");
        } else {
          this.$store.dispatch("project/addMember", {
            mitglied: new_member,
            role: this.role,
          });
          alert("Der Nutzer wurde der Gruppe hinzugefügt");
          this.$router.push({ name: "Groupmanagement" });
        }
      }

      console.log(this.member);
      console.log(this.role);
      //gruppenadmins doesnt work for now, because in addMember the body is for arrays in the backend
    },
  },
  computed: {
    getStudents() {
      return this.$store.getters["user/getStudents"];
    },
    getGroupMembers() {
      return this.$store.state.project.currentProject.gruppenmitglieder;
    },
    getGroupAdmins() {
      return this.$store.state.project.currentProjectGroupAdmins;
    },
    getCurrentUserID() {
      return this.$store.state.profile.userData.uuid;
    },
  },
};
</script>
