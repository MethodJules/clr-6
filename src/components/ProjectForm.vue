<template>
    <div class="projektAnlegen">
        <div>
              <b-modal id="create_project" title="Projekt Anlegen">
                <table>
                  <tr>
                    <td>
                      <label for="titel">Projekttitel: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        id="titel"
                        v-model="project.titel"
                        type="text"
                        placeholder="hier eingeben"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="betreuenderDozent">Betreuer: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        v-model="project.betreuenderDozent"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="externeMitwirkende">Externe Partner*innen(bitte mit Komma trennen) </label>
                    </td>
                  </tr>
                  <tr>
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
                      <label for="schlagworter">Schlagwörter(bitte mit Komma trennen) </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        v-model="project.schlagworter"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="kurzbeschreibung">Projektbeschreibung: </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        id="kurzbeschreibung"
                        v-model="project.kurzbeschreibung"
                        type="text"
                        placeholder="hier eingeben"
                      />
                    </td>
                  </tr>
                </table>
                <b-button @click="newProject()">Projekt anlegen</b-button>
              </b-modal>

              <b-button size="lg" v-b-modal.create_project>+</b-button>
            </div>
    </div>
</template>
<script>


export default {
    
    props:{
      project: Object
    },
    methods: {
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
