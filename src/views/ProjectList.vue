<template>
    <div>
        <h1>Meine Projekte</h1>
        <br />
        <b-overlay :show="getLoadingStatus" rounded="sm">
            <b-row>
                <!-- <b-card class="m-2"
        v-for="proj in projectList"
        :key="proj.projectId"
        :title="proj.titel"
      > -->
                <div>
                    <b-row>
                        <b-col>
                            <div>
                                <table>
                                    <tr
                                        v-for="project in getMyProjectlist"
                                        :key="project.idd"
                                    >
                                        <b-card style="max-height: 20rem">
                                            <b-col>
                                                <b-row>
                                                    <b-col>
                                                        <h3>
                                                            {{ project.title }}
                                                        </h3>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col>
                                                        <!--                         <b-link
                          :to="{ name: 'Home', params: { user_id: getUserID } }"
                          class="btn btn-outline-dark btn-block mb-2"
                          >Dashboard</b-link
                        >
                      </b-col> -->
                                                        <b-link
                                                            :to="{
                                                                name: 'Home',
                                                                params: {
                                                                    project_id:
                                                                        project.idd,
                                                                },
                                                            }"
                                                            class="
                                                                btn
                                                                btn-outline-dark
                                                                btn-block
                                                                mb-2
                                                            "
                                                            >Dashboard</b-link
                                                        >
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col>
                                                        <ReflexionAuswahl
                                                            :projectId="
                                                                project.idd
                                                            "
                                                        />
                                                    </b-col>
                                                </b-row>
                                            </b-col>
                                        </b-card>
                                    </tr>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                </div>
                <!-- </b-card> -->

                <b-card
                    title="Neues Projekt"
                    style="max-height: 10rem"
                    class="m-2"
                >
                    <b-row>
                        <b-col cols="3">
                            <ProjectForm :project="project"></ProjectForm>

                            <!-- <b-link class=" btn btn-outline-dark mt-5">Neues Projekt</b-link> -->
                        </b-col>
                    </b-row>
                </b-card>
            </b-row>
        </b-overlay>
    </div>
</template>

<script>
import ReflexionAuswahl from "@/components/ReflexionAuswahl.vue";
import ProjectForm from "@/components/ProjectForm";
export default {
    name: "ProjectList",
    components: {
        ReflexionAuswahl,
        ProjectForm,
    },
    data() {
        return {
            project: {
                kurzbeschreibung: "",
                betreuenderDozent: [""],
                externeMitwirkende: "",
                schlagworter: [],
                idd: "",
                title: "",
            },
            //projectList: this.getMyProjectlist,
        };
    },
    methods: {
        fetchData(proj) {
            this.project.title = proj.title;
        },
        getProjectTitles: function () {
            this.$http.get(
                "https://clr-backend.x-navi.de/jsonapi/node/projekt",
                function (title) {
                    this.$set("title", title);
                    console.log(title);
                }
            );
        },
    },
    computed: {
        getUserID() {
            // return true
            return this.$store.state.sparky_api.drupalUserID;
        },
        getMyProjectlist() {
            return this.$store.state.project.myProjects;
        },
        getLoadingStatus() {
            return this.$store.state.project.loadingStatus;
        },
    },
    ready: function () {
        this.getProjectTitles();
    },
    /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
    async mounted() {
        this.$store.dispatch("project/loadProjectsFromBackend").then(() => {});
        //this.projectList = this.$store.state.project.myProjects;
        //console.log(this.projectList);
        console.log("mount projectList");
    },
};
</script>