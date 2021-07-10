<template>
    <div >
    
        <b-row>
            <br>
            <b-col>
                <br>
            </b-col>
        </b-row>
        <b-row>
           
            
            <p>{{this.$route.params.project_id}}</p>
            <br>
            <p style="font-weight: bold" >Projekttitel</p>
        </b-row>
        <b-row>
            <table>

                <tr >
                    <td> {{projectList[findIndex()].title}}</td>
                    <!-- <td v-if=" this.$route.params.project_id === '36e2c5a4-c795-4f64-acc9-6a8cc03e2838'">{{projectList[0].title}}</td>
                    <td v-if=" this.$route.params.project_id === '6f01abff-4e23-4425-94b4-3743c3ebd82f'">{{projectList[1].title}}</td>
                    <td v-if=" this.$route.params.project_id === 'c93deffc-ef26-406c-a3c1-f83d76eddbd0'">{{projectList[2].title}}</td>
                    <td v-if=" this.$route.params.project_id === '99c847e2-cb0e-404b-8303-13ec8d19c3d9'">{{projectList[3].title}}</td> -->
                </tr>
            </table>
           
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Betreuer*in</p>
        </b-row>
        <b-row>
            <table>
                <tr>
                    <td >{{projectList[findIndex()].betreuenderDozent}}</td>
                </tr>
            </table>
 
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Externe Partner*innen(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>
            <table>
                <tr >
                    <td>{{projectList[findIndex()].externeMitwirkende}}</td>
                    
                </tr>
            </table>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Schlagwörter(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>
            <table>
                <tr>
                    
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
                    <td >{{projectList[findIndex()].kurzbeschreibung}}</td>
                  
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
            <ProjectForm :project="project"></ProjectForm>
                    
                </b-row>
                </b-card>
                 
                <b-button v-b-modal.create_project>Beschreibung bearbeiten </b-button>
            </b-col>
            <b-col cols="3">
                <b-link :to="{name: 'Groupmanagement'}" class="btn btn-outline-dark btn-block mb-2">Zum Gruppenmanagement</b-link>
            </b-col>
            <b-col cols="2"/>
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
        var rightIndex
        return{

                  project: {
        kurzbeschreibung: "",
        betreuenderDozent: "",
        externeMitwirkende: "",
        schlagworter: [],

        idd: "",
        title: "",
        /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
      },
            projectId: this.$route.params.project_id,
            
            projectList:{
                titel: '',
                betreuenderDozent: '',
                externeMitwirkende: '',
                kurzbeschreibung: '',
                schlagworter:'',
            }
            ,
            projectContent: [],
            rightIndex,
            gruppenmitglieder: ['person1', 'person 2']
        }
    },
    methods:{
        openThisModal(){
            this.$refs['create_project'].show()
        },
        findIndex(){
            let rightIndex = 0
            for(let i=0; i< this.$store.state.project.myProjects.length; i++){
                if(this.$route.params.project_id === this.$store.state.project.myProjects[i].idd){
                    rightIndex = i
                }
            }
           
            return rightIndex
        }
        /* showEntry(){
            var projectId = this.$store.state.project.myProjects.idd
            var rightIndex = 0;
            if(projectId === 'ab00a160-7179-4915-bffe-d4586bfc5477'){
                rightIndex = 0
            }else if(projectId === 'a7dfaf1f-119a-4a35-a971-9d4a9d8b8070' ){
                rightIndex = 1
            }else if(projectId === 'c93deffc-ef26-406c-a3c1-f83d76eddbd0'){
                rightIndex = 2
            }else{
                rightIndex= 3
            }
            return rightIndex
        }, */
    },
    mounted() {
    //this.$store.dispatch('project/loadProjectsFromBackend',{projectId: this.$route.params.project_id})
    this.projectList = this.$store.state.project.myProjects
    
  },
  computed: {
      giveID(){
          var projectId = this.$store.state.project.projectList.idd
          return projectId
      },
    ausgabeProjekt:{
        get: function(){
            return this.projectList[0].schlagworter
            
        },
        getProjectID(){
      return this.$route.params.project_id
    },
    projectSelection(){
        return this.$store.state.project.projectList.find(
                project => project.project_id === this.$route.params.project_id
            );
    }
    }
  },
})
</script>
