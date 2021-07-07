<template>
    <div >

        <table>

            <tr>
                <td> <p style="font-weight: bold" >Projekttitel</p> </td>
            </tr>
            <tr>
                <td> {{projectList[findIndex()].title}} </td> 
                <!-- <td> {{project.titel}}</td> -->
            </tr>
            <br>
            <tr>
                <td> <p style="font-weight: bold" >Betreuer*in </p> </td>
            </tr>
            <tr>
                <td> {{project.betreuenderDozent}} </td>
            </tr>
            <br>
            <tr>
                <td> <p style="font-weight: bold" >Externe Partner </p> </td>
            </tr>
            <tr>
                <td> {{project.externeMitwirkende}} </td>
            </tr>
            <br>
            <tr>
                <td> <p style="font-weight: bold" >Schlagwörter </p> </td>
            </tr>
            <tr>
                <td> {{projectList[findIndex()].schlagworter}} </td>
            </tr>
            <br>
            <tr>
                <td> <p style="font-weight: bold" >Kurzbeschreibung </p> </td>
            </tr>
            <tr>
                <td> {{projectList[findIndex()].kurzbeschreibung}} </td>
            </tr>
            <br>
            <tr>
                <td> <p style="font-weight: bold" > Gruppenmitglieder </p> </td>
            </tr>
            <tr>
                <td> {{ project.gruppenmitglieder }} </td>
            </tr>
            <tr>
                <td>  </td>
            </tr>
            <br>
            


            </table>
           
        
       
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
                
          
                <b-row>

                    <ProjectForm :project="project"> Beschreibung bearbeiten </ProjectForm> 
                   
                    
                </b-row>
                
                 
                
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

           
            projectId: this.$route.params.project_id,
            
            projectList:{
                titel: '',
                betreuenderDozent: '',
                externeMitwirkende: '',
                kurzbeschreibung: '',
                schlagworter:'',
            }
            ,
            project:{
                titel: "Projekt",
                betreuenderDozent: ['Muster', 'Muster2'],
                externeMitwirkende: "Max",
                kurzbeschreibung: "Kurzbeschreibung x",
                schlagworter:['Hallo'],
                gruppenmitglieder:['Max']
            },


            projectContent: [],
            rightIndex
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
        },

        
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

    title: {
            get() {
                return this.$store.state.title;
            },
            set(value) {
                this.$store.commit('setTitel', value);
            }
    },
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
    },
    
  },
})
</script>
