<template>
    <div>
        <h1>
          Meine Projekte
        </h1>
        <br>
    <b-row>
      <!-- <b-card class="m-2"
        v-for="proj in projectList"
        :key="proj.projectId"
        :title="proj.titel"
      > -->
      <div>
        <b-row>
          <table>
          <tr v-for= "proj in projectList" :key="proj.id">
            <h3>{{proj.titel}}</h3>
          </tr>
          </table>
        </b-row>
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
      </div>
      <!-- </b-card> -->

      <b-card title="Neues Projekt" class="m-2">
          
        <b-row>
          <b-col>
            <ProjectForm :project=project></ProjectForm>
            
            <!-- <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link> -->
          </b-col>
        </b-row>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import ReflexionAuswahl from '@/components/ReflexionAuswahl.vue'
import ProjectForm from '@/components/ProjectForm'
export default {
    name: "ProjectList",
    
    
  components: {
    ReflexionAuswahl,
    ProjectForm
  },
  data() {
    return {
      project: {
        titel: "",
        kurzbeschreibung: "",
        betreuenderDozent: "",
        externeMitwirkende: "",
        schlagworter: "",
        
        idd:"",
        title: ""
        /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
      },

      projectList: [{
                  titel: "Testtitel",
        kurzbeschreibung: "Dies ist nur eine Kurzbeschreibung",
        betreuenderDozent: "Julien, Maren",
        externeMitwirkende: "Nithusha, Aylin",
        schlagworter: "test, projektliste, projekte"
        
      }

      ],
    };
  },
  methods: {
    
  },
  mounted() {
    this.$store.dispatch('project/loadProjectsFromBackend')
    this.projectList = this.$store.state.project.projectList
    
  },
};
</script>