<template>
  <div>
    <App v-bind:showRightMenu="false"></App>
    <b-row>
      <b-card
        class="m-2"
        v-for="project in projectList"
        :key="project.projectId"
        :title="project.titel"
      >
        <b-row>
          <b-col>
            <b-link to="/" class="btn btn-outline-dark btn-block mb-2"
              >Dashboard</b-link
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <ReflexionAuswahl />
          </b-col>
        </b-row>
      </b-card>

      <b-card title="Neues Projekt" class="m-2">
        <b-row>
          <b-col>
            <div>
              <b-modal id="create_project" title="Projekt Anlegen">
                <table>
                  <tr>
                    <td>
                      <label for="titel">Titel: </label>
                    </td>
                    <td>
                      <input
                        id="titel"
                        v-model="project.titel"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="kurzbeschreibung">Kurzbeschreibung: </label>
                    </td>
                    <td>
                      <input
                        id="kurzbeschreibung"
                        v-model="project.kurzbeschreibung"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="titel">Name des Anlegenden: </label>
                    </td>
                    <td>
                      <input
                        v-model="project.nameDesAnlegenden"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="titel">Betreuender Dozent: </label>
                    </td>
                    <td>
                      <input
                        v-model="project.bedreuenderDozent"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="titel">Externe Mitwirkende: </label>
                    </td>
                    <td>
                      <input
                        v-model="project.externeMitwirkende"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="titel">Schlagwörter: </label>
                    </td>
                    <td>
                      <input
                        v-model="project.schlagwörter"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                </table>
                <b-button @click="newProject()">Speichern</b-button>
              </b-modal>

              <b-button size="lg" v-b-modal.create_project>+</b-button>
            </div>
            <!-- <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link> -->
          </b-col>
        </b-row>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";
export default {
  name: "ProjectList",
  components: {
    ReflexionAuswahl,
  },
  data() {
    return {
      project: {
        titel: "",
        kurzbeschreibung: "",
        nameDesAnlegenden: "",
        bedreuenderDozent: "",
        externeMitwirkende: "",
        schlagwoerter: "",
        projectId: 0,
        //TODO: array in backend dafür machen schlagwörter: [],
        //TODO: array in backend dafür machen betreuenderDozent: [],
        //TODO: array in backend dafür machen externeMitwirkende: [],
      },

      projectList: [
        {
          titel: "Testtitel",
          kurzbeschreibung: "Dies ist nur eine Kurzbeschreibung",
          nameDesAnlegenden: "Marcel",
          bedreuenderDozent: "Julien, Maren",
          externeMitwirkende: "Nithusha, Aylin",
          schlagwoerter: "test, projektliste, projekte",
          projectId: 0,
        },
      ],
    };
  },
  methods: {
    newProject() {
      var addProj = {
        titel: "",
        kurzbeschreibung: "",
        nameDesAnlegenden: "",
        bedreuenderDozent: "",
        externeMitwirkende: "",
        schlagwoerter: "",
        projectId: 0,
      };
      addProj.titel = this.project.titel;
      addProj.kurzbeschreibung = this.project.kurzbeschreibung;
      addProj.nameDesAnlegenden = this.project.nameDesAnlegenden;
      addProj.bedreuenderDozent = this.project.bedreuenderDozent;
      addProj.externeMitwirkende = this.project.externeMitwirkende;
      addProj.schlagwoerter = this.project.schlagwoerter;
      addProj.projectId = this.projectList.length + 1;
      this.projectList.push(addProj);
    },
  },
};
</script>