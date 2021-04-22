<template>
  <div class="home">
    <b-container>
      <b-row>
        <h2>Projektgruppe {{ projectGroup.title }}</h2>
      </b-row>
      <br />
      <h4>Gruppenadministrator:</h4>
      <p>{{ projectGroup.admin }}</p>

      <h4>Gruppenmitglieder</h4>
      <div class="border border-dark">
      <div
        
        v-for="member in projectGroup.member"
        :key="member.index"
      >
        <b-row>
          <b-col>
            <p>{{ member }}</p>
          </b-col>
          <b-col>
            <p>{{ member.role }} Admin</p>
          </b-col>
          <b-col>
            <b-button @click="deleteMember(member)"> X </b-button>
          </b-col>
        </b-row>
      </div>
      </div>
      <br />
      <h4>Betreuer</h4>
      <p>{{ projectGroup.betreuer }}</p>

   

      <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">
        Neues Mitglied Hinzufügen
      </b-button>

      <b-row>

        <b-col col="3">
          <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">
            Neues Mitglied Hinzufügen
          </b-button>
        </b-col>
        <b-col col="3">
          <b-button>Admin-Rechte entfernen</b-button>
        </b-col>
        <b-col col="3">
          <b-button v-b-modal.leave_group>Gruppe verlassen</b-button>
        </b-col>
        <b-col col="2"> </b-col>
      </b-row>
      <b-modal id="leave_group" title="Bist du dir sicher?">
        <b-row>
          <p>
            Du kannst nicht mehr auf das Projekt zugreifen, wenn du die Gruppe
            verlaesst.
          </p>
        </b-row>
        <b-row>
          <b-col>
            <b-button>Nein</b-button>
          </b-col>
          <b-col>
            <b-button>Ja</b-button>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title> Gruppenmitglieder hinzufügen </template>
        <label for="selected">Benutzer/in suchen </label>
        <div container>
          <b-form-select
            v-model="selected"
            :options="newMemberList"
          ></b-form-select>

          <input
            v-model="newMember"
            type="text"
            placeholder="Geben Sie den Namen manuell ein!"
          />
        </div>

        <b-button @click="$bvModal.hide('bv-modal-example')"
          >Abbrechen</b-button
        >
        <b-button @click="speichern()"> Speichern </b-button>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      selected: null,
      projectGroup: {
        title: "Platzhalter",
        //liste aus personenobjekten {name, rolle}
        member: ["Max", "Person", "Schuh"],
        admin: "Max",
        betreuer: "Max",
      },
      //aus backend holen - liste mit objekten
      newMemberList: ["person1", "person2", "person3"],
      newMember: "",
    };
  },
  methods: {
    deleteMember: function (member) {
      this.$store.dispatch("members/deleteMembers", member);
    },
    speichern() {
      if (this.selected != null) {
        this.projectGroup.member.push(this.selected);
      }

      console.log(this.projectGroup);

      //this.$store.dispatch('members/addMember', member)

      // this.$router.push({ name: 'Groupmanagement'})
    },
  },

  computed: {
    ...mapState({
      members: (state) => state.members,
    }),
  },
};
</script>

<style scoped>
* {
  color: black;
}

h1 {
  text-align: center;
}

h3 {
  float: left;
  margin: 3px;
  margin-left: 10%;
  display: inline-block;
}
h5 {
  text-align: center;
}

button {
  float: right;
}

.groupCard {
  margin: 5px;
  width: 30%;
  text-align: center;
}

.card {
  display: inline-block;
}
</style>