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
            <ProjectList project.titel></ProjectList>
           <!-- <ProjectList projectContent[0].titel></ProjectList> -->
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Betreuer*in</p>
        </b-row>
        <b-row>
            
           <!-- <ProjectList v-bind:betreuenderDozent="project.betreuenderDozent"/> -->
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Externe Partner*innen(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>

        </b-row>
        <b-row>
            <p style="font-weight: bold" >Schlagwörter(bitte mit Komma trennen)</p>
        </b-row>
        <b-row>

        </b-row>
        <b-row>
            <p style="font-weight: bold" >Projektbeschreibung</p>
        </b-row>
        <b-row>
        </b-row>
        <b-row>
            <p style="font-weight: bold" >Gruppenmitglieder</p>

        </b-row>
        <b-row>
        </b-row>
        <b-row>
            <b-col col="2">
            </b-col>
            <b-col col="3">
                <b-link :to="{name: 'Home'}" class="btn btn-outline-dark btn-block mb-2">Zum Dashboard</b-link>
            </b-col>
            <b-col col="3">
                <b-button v-b-modal.create_project>Beschreibung bearbeiten</b-button>
            </b-col>
            <b-col col="3">
                <b-link :to="{name: 'Groupmanagement'}" class="btn btn-outline-dark btn-block mb-2">Zum Gruppenmanagement</b-link>
            </b-col>
            <b-col col="2"/>
        </b-row>
        

    </div>
</template>

<script>
import ProjectList from '@/views/ProjectList.vue'

export default({
    name: "Projektbeschreibung",
    components: {
        ProjectList,
    },
    data(){
        return{
            projectContent: []
        }
    },
    mounted(){
        this.ProjectList = this.$store.state.project.projectList
        this.projectContent=this.projectList
    }
})
</script>
