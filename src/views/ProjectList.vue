<template>
<<<<<<< HEAD
  <div>
    <App v-bind:showRightMenu="false"></App>
    <b-row>
      <b-card
        class="m-2"
        v-for="project in projectList"
        :key="project.projectId"
        :title="project.titel"
      >
=======
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
>>>>>>> 735937242b032fde0a6a2e6ef35d59d4423bd1db
        <b-row>
          <b-col>

          <table>
          <tr v-for= "project in projectList" :key="project.id">
            <b-card  style="max-height: 20rem;" >
          
            <b-col>
            <b-row>
              <b-col>
                <h3>{{project.title}}</h3>
                
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-link to="/home" class="btn btn-outline-dark btn-block mb-2"
                >Dashboard</b-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <ReflexionAuswahl />
              </b-col>
            </b-row>
            </b-col>
            
            </b-card>
          </tr>
          </table>

          </b-col>
        </b-row>
        
      </div>
      <!-- </b-card> -->

<<<<<<< HEAD
      <b-card title="Neues Projekt" class="m-2">
=======
      <b-card title="Neues Projekt" style="max-height: 10rem;" class="m-2">
          
>>>>>>> 735937242b032fde0a6a2e6ef35d59d4423bd1db
        <b-row>

          <b-col col="3">
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
<<<<<<< HEAD
  name: "ProjectList",
=======

    name: "ProjectList",
    
    
>>>>>>> 735937242b032fde0a6a2e6ef35d59d4423bd1db
  components: {
    ReflexionAuswahl,
    ProjectForm
  },
  data() {
    return {
        
      project: {
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

<<<<<<< HEAD
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
=======
      projectList: [{
        title: "Testtitel",
        kurzbeschreibung: "Dies ist nur eine Kurzbeschreibung",
        betreuenderDozent: "Julien, Maren",
        externeMitwirkende: "Nithusha, Aylin",
        schlagworter: "test, projektliste, projekte"
        
      }

>>>>>>> 735937242b032fde0a6a2e6ef35d59d4423bd1db
      ],
    };
  },
  

  methods: {
<<<<<<< HEAD
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
=======
    fetchData(proj){
        this.project.title=proj.title
>>>>>>> 735937242b032fde0a6a2e6ef35d59d4423bd1db
    },
    getProjectTitles: function(){
      this.$http.get('https://clr-backend.x-navi.de/jsonapi/node/projekt', function(title){
        this.$set('title', title);
        console.log(title);
      })
    }
    
  },
  ready: function(){
    this.getProjectTitles();
  },
  /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
  async mounted() {
    this.$store.dispatch('project/loadProjectsFromBackend')
    this.projectList = this.$store.state.project.projectList
    console.log(this.projectList)
    console.log("mount projectList")

  },
};
</script>
