<template>
    <div>
        
        <b-row>
            <b-card v-for="project in projectList" :key="project.projectId" :title="project.projectName+project.projectId" class="m-2">
                <b-row>
                    
                    <b-col>
                        <b-link to="/" class="btn btn-outline-dark btn-block mb-2">Dashboard</b-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <ReflexionAuswahl/>
                    </b-col>
                </b-row>
            </b-card>

            <b-card title="" class="m-2">
                <b-row>
                   <b-col>
                       <p>Neues Projekt</p>
                       <b-button @click= "newProject()">+</b-button>
                       <!-- <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link> -->
                   </b-col>
                </b-row>
            </b-card>
        </b-row>
    </div>
</template>

<script>
import ReflexionAuswahl from '@/components/ReflexionAuswahl.vue'
export default {
    name: "ProjectList",
    components:{
        ReflexionAuswahl
    },
    data() {
        return {
            projectList: [
                {projectName: 'Project ', projectId: 1},
                {projectName: 'Project ', projectId: 2},
                {projectName: 'Project ', projectId: 3}
            ]
        }
    },
    methods:{
        newProject(){
            var addProj={
                projectName: "Project ",
                projectId: this.projectList.length + 1
            }
            this.projectList.push(addProj);
        }
    }
}
</script>