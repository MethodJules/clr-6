<template>
    <div class="projektAnlegen">
        <div>
              <b-modal ref="create_project" title="Projekt Anlegen">
                <form @submit.prevent="submitForm">
                <table>
                  <tr>
                    <td>
                      <label for="title">Projekttitel: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group"> 
                      <input
                        id="title"
                        v-model="project.title"
                        type="text"
                        placeholder="hier eingeben" class="form-control">
                                   <span v-if="!$v.project.title.required && $v.project.title.$dirty" class="text-danger">Title is required!</span>
            <span v-if="!$v.project.title.minLength && $v.project.title.$dirty" class="text-danger">Title should be at least 4 letters long</span>
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
            <vue-simple-suggest
            v-model="project.betreuenderDozent"
            :styles="autoCompleteStyle"
            type="text"
            display-attribute="user"
            value-attribute="id"
            :list="simpleSuggestionList"
            :filter-by-query="true"
            placeholder
            ="Dozenten eingeben"
          />
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
            <vue-simple-suggest
            v-model="project.externeMitwirkende"
            :styles="autoCompleteStyle"
            type="text"
            display-attribute="user"
            value-attribute="id"
            :list="simpleSuggestionList"
            :filter-by-query="true"
            placeholder
            ="externe Mitwirkende eingeben"
          />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="schlagworter">Schlagwörter(bitte mit Komma trennen) </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group">
                      <input
                        v-model="project.schlagworter"
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
                <!-- <b-button @click="newProject()">Projekt anlegen</b-button> -->
                </form>
              </b-modal>

              <b-button @click="showThisModal()" size="lg" v-b-modal.create_project>+</b-button>
            </div>
    </div>
</template>
<script>

import { required, minLength, alpha } from 'vuelidate/lib/validators'
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
export default {
  components:{
    VueSimpleSuggest
  },
  data(){
    return{
      chosen: '',
       autoCompleteStyle : {
          vueSimpleSuggest: "position-relative",
          inputWrapper: "",
          defaultInput : "form-control",
          suggestions: "position-absolute list-group z-1000",
          suggestItem: "list-group-item"
        }
    }
  },
    
    props:{
      title: String,
      project: Object
    },
    validations: {
    project: {
      title:{
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
      
      showThisModal(){
        this.$refs['create_project'].show()
      },
      submitForm() {
      this.$v.$touch();
      if(!this.$v.$invalid){
        console.log('title: ${this.titela}')
        this.newProject()
      }
    },
        newProject() {
      var schlagwortarray =this.project.schlagworter.split(",")
      var keywords = Object.assign({}, schlagwortarray);
      console.log(keywords)
      var addProj={
            title: this.project.title,
            kurzbeschreibung: this.project.kurzbeschreibung,
            betreuenderDozent: this.project.betreuenderDozent,
            externeMitwirkende: this.project.externeMitwirkende,
            schlagworter: keywords,
            gruppenadmin: this.$store.state.sparky_api.drupalUserID,
            projectIdd: 0
      }
      
      this.$store.dispatch('project/createProject', addProj)
      console.log(this.project.kurzbeschreibung)
      console.log("das hier nach ist addproj")
      console.log(addProj.schlagworter)
      console.log(this.project)
      //this.projectList.push(addProj)
      
      this.title = " "
      this.kurzbeschreibung= ""
      this.betreuenderDozent= " "
      this.externeMitwirkende= " "
      this.schlagworter= " "
      //this.projectList.length + 1
      
    },

    },
        computed: {
      simpleSuggestionList(){
        return this.$store.state.sparky_api.lecturers
      }
    },
}
</script>
