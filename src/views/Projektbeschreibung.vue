<template>
    <div >
        <b-row>
            <br>
            <b-col>
                <br>
            </b-col>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Projekttitel</p>
        </b-row>
        <b-row>
            <table>
                //FIXME: Attribut wird ausgegeben, beim refreshen der Seite allerdings nicht mehr
                <tr >
                    <td>{{projectList[0].titel}}</td>
                </tr>
            </table>
           <!-- <ProjectList projectContent[0].titel></ProjectList> -->
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Betreuer*in</p>
        </b-row>
        <b-row>
            <table>
                <tr>
                    <td>{{projectList[1].betreuenderDozent}}</td>
                </tr>
            </table>
           <!-- <ProjectList v-bind:betreuenderDozent="project.betreuenderDozent"/> -->
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Externe Partner*innen(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>
            <table>
                <tr >
                    
                    <td>{{projectList[1].externeMitwirkende}}</td>
                </tr>
            </table>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Schlagwörter(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>
            <table>
                <tr>
                    //FIXME: Attribut wird ausgegeben, beim refreshen der Seite allerdings nicht mehr
                    <td>{{ausgabeProjekt}}</td>
                </tr>
            </table>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Projektbeschreibung</p>
        </b-row>
        <b-row>
            <table>
                <tr >
                    //FIXME: Attribut wird ausgegeben, beim refreshen der Seite allerdings nicht mehr
                    <td>{{projectList[0].kurzbeschreibung}}</td>
                </tr>
            </table>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Gruppenmitglieder</p>
            
        </b-row>
        <b-row>
            <!-- <div
                class="border border-dark"
                v-for="member in projectGroup.member"
                :key="member.index"
            >
            <p>{{ member }}</p>
            </div> -->
        </b-row>
        <b-row>
            <b-col col="2">
            </b-col>
            <b-col col="3">
                <b-link :to="{name: 'Home'}" class="btn btn-outline-dark btn-block mb-2">Zum Dashboard</b-link>
            </b-col>
            <b-col col="3">
                <b-card title="bearbeiten" style="max-height: 10rem;" class="m-2">
          
                <b-row>    
                    <ProjectForm :project=project></ProjectForm>
                    
                </b-row>
                </b-card>
                 
                <b-button v-b-modal.create_project>Beschreibung bearbeiten </b-button>
            </b-col>
            <b-col col="3">
                <b-link :to="{name: 'Groupmanagement'}" class="btn btn-outline-dark btn-block mb-2">Zum Gruppenmanagement</b-link>
            </b-col>
            <b-col col="2"/>
        </b-row>
        

    </div>
</template>

<script>
//import ProjectList from '@/views/ProjectList.vue'
import ProjectForm from '@/components/ProjectForm.vue'

export default({
    name: "Projektbeschreibung",
    
    components: {
        //ProjectList,
        ProjectForm
    },
    data(){
        
        return{
            projectList:{
                titel: '',
                betreuenderDozent: '',
                externeMitwirkende: '',
                kurzbeschreibung: '',
                schlagworter:'',
            }
            ,
            projectContent: []
        }
    },
    methods:{
        openThisModal(){
            this.$refs['create_project'].show()
        }
    },
    mounted() {
    this.$store.dispatch('project/loadProjectsFromBackend')
    this.projectList = this.$store.state.project.projectList
    
  },
  computed: {
    ausgabeProjekt:{
        get: function(){
            return this.projectList[0].schlagworter
            
        }
    }
  },
})
</script>
