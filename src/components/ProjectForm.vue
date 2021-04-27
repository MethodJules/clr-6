<template>
    <div class="projektAnlegen">
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

              <b-button size="lg" v-b-modal.create_project>+</b-button>
            </div>
    </div>
</template>
<script>

import { required, minLength, alpha } from 'vuelidate/lib/validators'
export default {
    
    props:{
      project: Object
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
            titel: this.project.titel,
            kurzbeschreibung: this.project.kurzbeschreibung,
            betreuenderDozent: this.project.betreuenderDozent,
            externeMitwirkende: this.project.externeMitwirkende,
            schlagworter: this.project.schlagworter,
            projectIdd: 0
      }
      
      this.$store.dispatch('project/createProject', this.project)
      console.log(this.project.kurzbeschreibung)
      this.projectList.push(addProj)
      
      this.titel = " "
      this.kurzbeschreibung= ""
      this.betreuenderDozent= " "
      this.externeMitwirkende= " "
      this.schlagworter= " "
      this.projectList.length + 1
      
    },
    }
}
</script>
