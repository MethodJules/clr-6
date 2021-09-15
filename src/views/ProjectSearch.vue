<template>
    <div>
        <vue-simple-suggest
            v-model="keyword"
            type="text"
            :list="simpleSuggestionList"
            :filter-by-query="true"
            placeholder="Geben Sie ein Schlagwort ein, um die Projektliste zu filtern!"
        />
        <!-- <div>
            <vue-simple-suggest
            placeholder
            ="Dozenten eingeben"
          />
                      </div> -->
        <b-badge v-for="keyword in keywords" :key="keyword.id" variant="primary"
            >{{ keyword }}
            <BIconXCircleFill v-on:click="deletekeyword(keyword)">
            </BIconXCircleFill
        ></b-badge>

        <!-- free input or a list of all existing keywords where one can choose keywords for filtering -->
        <br />
        <b-button @click="keywordSearch(keyword)">Suchen</b-button>

        <!-- {{keyword2}}  -->

        <b-card-group columns v-for="project in searchResult" :key="project.id">
            <b-card>
                <b-card-text>
                    <p>{{ project.title }}</p>
                    <div v-if="'istDozent' == 'istDozent'">
                        <p>Kurzbeschreibung: {{ project.kurzbeschreibung }}</p>
                        <p>
                            Betreuender Dozent: {{ project.betreuenderDozent }}
                        </p>
                        <p>
                            externe Mitwirkende:
                            {{ project.externeMitwirkende }}
                        </p>
                        <p>Schlagwörter: {{ project.schlagworter }}</p>
                    </div>
                </b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>


<script>
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";
import { BIconXCircleFill } from "bootstrap-vue";

export default {
    name: "ProjectList",
    components: {
        VueSimpleSuggest,
        BIconXCircleFill,
    },

    props: {
        keyword2: String,
    },

    data() {
        return {
            project: {
                kurzbeschreibung: "",
                betreuenderDozent: "",
                externeMitwirkende: "",
                schlagworter: "",
                id: "",
                title: "",
                /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
            },

            projectList: [],
            searchResult: [],
            existingKeywordList: [],

            keywords: [],
            keyword: "",
        };
    },

    methods: {
        simpleSuggestionList() {
            //return this.existingKeywordList
            return ["schlagwort", "Testprojekt", "Literaturreview"];
        },

        deletekeyword(keyword) {
            var keywordIndex = this.keywords.indexOf(keyword);
            this.keywords.splice(keywordIndex, 1);
            this.adjustKeywords();
        },

        keywordSearch(keyword) {
            this.keywords.push(keyword);
            console.log(this.searchResult);
            this.adjustKeywords();
        },

        adjustKeywords() {
            this.searchResult = [];
            for (var project of this.projectList) {
                console.log(project);

                for (var keyword of this.keywords) {
                    if (project.schlagworter == keyword) {
                        this.searchResult.push(project);
                    }
                }
                if (this.keywords < 1) {
                    this.searchResult = this.projectList;
                }
            }
        },

        fetchData(proj) {
            this.project.titel = proj.titel;
        },
        getProjectTitles: function () {
            this.$http.get(
                "https://clr-backend.ddns.net/jsonapi/node/projekt",
                function (titel) {
                    this.$set("titel", titel);
                    console.log(titel);
                }
            );
        },
    },
    ready: function () {
        this.getProjectTitles();
    },
    /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
    async mounted() {
        //this.$store.dispatch('project/loadProjectsFromBackend')
        this.projectList = this.$store.state.project.projectList;
        this.searchResult = this.projectList;

        for (var keyword of this.projectList) {
            console.log("test");
            this.existingKeywordList.push(keyword.schlagworter[0]);
        }
        console.log("keywordlist");
        console.log(this.existingKeywordList);
        this.keywordSearch(this.keyword2);
    },
};
</script>
