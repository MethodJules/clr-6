<template>
  <div class="home">
    <h2>Gruppenmitglied hinzufügen</h2>
    <b-form @submit.prevent="save">
      <div class="form-group">
        Benutzer:
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
        <div container>
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
import { mapState } from "vuex";
export default {
  name: "Home",

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
  computed: {
    ...mapState("project", ["currentProject", "currentProjectGroupAdmins"]),
    ...mapState("profile", ["userData"]),
    getStudents() {
      return this.$store.getters["user/getStudents"];
    },
  },
  methods: {
    save() {
      const new_member = {
        username: this.member.name,
        userid: this.member.uuid,
      };
      if (
        this.currentProject.gruppenmitglieder.some(
          (member) => member.userid === this.userData.uuid
        )
      ) {
        alert(
          "Du musst Gruppenadministrator sein, um neue Gruppenmitglieder hinzufügen zu können"
        );
      } else if (
        this.currentProjectGroupAdmins.some(
          (member) => member.userid === this.userData.uuid
        )
      ) {
        if (
          this.currentProjectGroupAdmins.some(
            (e) => e.userid === new_member.userid
          ) ||
          this.currentProject.gruppenmitglieder.some(
            (e) => e.userid === new_member.userid
          )
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
    },
  },
};
</script>
