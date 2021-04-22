<template>
    <div>
        <App v-bind:showRightMenu="false" ></App>
    <b-row>
      <b-card class="m-2"
        v-for="project in projectList"
        :key="project.projectId"
        :title="project.titel"
      >
        <b-row>
          <b-col>
            <b-link to="/home" class="btn btn-outline-dark btn-block mb-2"
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

            <form @submit.prevent="submitForm">
                <table>
                  <tr>
                    <td>
                      <label for="titel">Projekttitel: </label>
                    </td>
                  </tr>
                  <tr>
                    <td> 	 
                      <div class="form-group"> 
                      <input
                        id="titel"
                        v-model="project.titel"
                        type="text"
                        placeholder="hier eingeben" class="form-control">
                                   <span v-if="!$v.project.titel.required && $v.project.titel.$dirty" class="text-danger">Title is required!</span>
            <span v-if="!$v.project.titel.minLength && $v.project.titel.$dirty" class="text-danger">Title should be at least 4 letters long</span>
                       </div> 
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      <label for="betreuenderDozent">Betreuer: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group"> 
                      <input
                        v-model="project.betreuenderDozent"
                        type="text"
                        placeholder="hier eingeben" class="form-control">
            <span v-if="!$v.project.betreuenderDozent.required && $v.project.betreuenderDozent.$dirty" class="text-danger">Dozent is required!</span>
            <span v-if="!$v.project.betreuenderDozent.alpha && $v.project.betreuenderDozent.$dirty" class="text-danger">A name is only allowed to use letters</span>
                       </div> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="externeMitwirkende">Externe Partner*innen(bitte mit Komma trennen) </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group">
                      <input
                        v-model="project.externeMitwirkende"
                        type="text"
                        placeholder="hier eingeben" class="form-control"
                      /></div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="schlagwörter">Schlagwörter(bitte mit Komma trennen) </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group">
                      <input
                        v-model="project.schlagwörter"
                        type="text"
                        placeholder="hier eingeben" class="form-control"
                      />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="kurzbeschreibung">Projektbeschreibung: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group"> 
                      <input
                      id="kurzbeschreibung"
                        v-model="project.kurzbeschreibung"
                        type="text"
                        placeholder="hier eingeben" class="form-control">
            <span v-if="!$v.project.kurzbeschreibung.required && $v.project.kurzbeschreibung.$dirty" class="text-danger">Kurzbeschreibung is required!</span>
            <span v-if="!$v.project.kurzbeschreibung.minLength && $v.project.kurzbeschreibung.$dirty" class="text-danger">A Kurzbeschreibung must be at least 4 letters long</span>
                       </div> 
                    </td>
                  </tr>
                </table>
                <b-button @click="submitForm()">Projekt anlegen</b-button>
                </form>
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
import { required, minLength, alpha } from 'vuelidate/lib/validators'

export default {

    name: "ProjectList",
    props:{
      bedreuenderDozent: String
    },
    
  components: {
    ReflexionAuswahl,
  },
  data() {
    return {
        
      project: {
        titel: "",
        kurzbeschreibung: "",
        betreuenderDozent: "",
        externeMitwirkende: "",
        schlagwoerter: "",
        projectId: 0,
        /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
      },

      projectList: [{
        titel: "Testtitel",
        kurzbeschreibung: "Dies ist nur eine Kurzbeschreibung",
        bedreuenderDozent: "Julien, Maren",
        externeMitwirkende: "Nithusha, Aylin",
        schlagwoerter: "test, projektliste, projekte",
        projectId: 0,
      }

      ],
    };
  },
  validations: {
    project: {
      titel:{
            required,
            minLength: minLength(4)
      },
      betreuenderDozent: {
            required,
            alpha
    },
    kurzbeschreibung: {
        required,
        minLength: minLength(4)
    }
    },

  },

  methods: {
    submitForm() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        console.log('titel: ${this.titela}')
        this.newProject()
      }
    },

    newProject() {

      var addProj={
            titel: "",
            kurzbeschreibung: "",
            bedreuenderDozent: "",
            externeMitwirkende: "",
            schlagwoerter: "",
            projectId: 0
      }
      addProj.titel=this.project.titel
      addProj.kurzbeschreibung=this.project.kurzbeschreibung
      addProj.bedreuenderDozent=this.project.bedreuenderDozent
      addProj.externeMitwirkende=this.project.externeMitwirkende
      addProj.schlagwoerter=this.project.schlagwoerter
      addProj.projectId= this.projectList.length + 1
      this.projectList.push(addProj);
    },
  },
};
</script>