<template>
    <div>
        <b-row>
            <b-card v-for="project in projectList" :key="project.projectId" :title="project.projectName" class="m-2">
                <b-row>
                    <b-col>
                        <b-link class="btn btn-outline-dark btn-block mb-2">Dashboard</b-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-link class="btn btn-outline-dark btn-block mb-2">Reflexion</b-link>
                    </b-col>
                </b-row>
            </b-card>

            <b-card title="" class="m-2">
                <b-row>
                   <b-col>
                       <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link>
                   </b-col>
                </b-row>
            </b-card>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectList: [
                {projectName: 'Project 1', projectId: 1},
                {projectName: 'Project 2', projectId: 2},
                {projectName: 'Project 1', projectId: 3}
            ]
        }
    }
}
</script>