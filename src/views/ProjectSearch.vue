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
    <b-badge v-for="(keyword, index) in keywords" :key="index" variant="primary"
      >{{ keyword }}
      <BIconXCircleFill v-on:click="deletekeyword(keyword)"> </BIconXCircleFill
    ></b-badge>

    <!-- free input or a list of all existing keywords where one can choose keywords for filtering -->
    <br />
    <b-button @click="keywordSearch(keyword)">Suchen</b-button>

    <!-- {{keyword2}}  -->

    <b-card-group v-for="(project, index) in getFilteredProjects" :key="index">
      <b-card border-variant="dark" :header="project.title" align="center">
        <!--               <b-card
        border-variant="dark"
        align="center"
        text-variant="white"
        overlay
        img-src="https://picsum.photos/900/250/?image=3"
      > -->
        <!-- 
        <b-img
          v-bind="user"
          src="https://picsum.photos/900/250/?image=3"
          fluid
          rounded="circle"
          class="img-center shadow shadow-lg--hover"
          style="height: 140px"
        /> -->

        <b-card-text>
          <div v-if="'istDozent' == 'istDozent'">
            <p>Kurzbeschreibung: {{ project.kurzbeschreibung }}</p>
            <p>Betreuender Dozent: {{ project.betreuenderDozent }}</p>
            <p>
              externe Mitwirkende:
              {{ project.externeMitwirkende }}
            </p>
            <span
              v-for="(schlagwort, index) in project.schlagworter"
              :key="index"
            >
              {{ schlagwort }},
            </span>
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
      user: { width: 200, height: 200, class: "m1" },
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
      return this.getKeyWords;
    },

    deletekeyword(keyword) {
      var keywordIndex = this.keywords.indexOf(keyword);
      this.keywords.splice(keywordIndex, 1);
      this.adjustKeywords();
    },

    keywordSearch(keyword) {
      this.keywords.push(keyword);
      this.$store.dispatch("project/loadProjectFilterbyKeyword", this.keywords);
      this.keyword = "";
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
        "https://clr-backend.x-navi.de/jsonapi/node/projekt",
        function (titel) {
          this.$set("titel", titel);
          console.log(titel);
        }
      );
    },
  },
  computed: {
    getKeyWords() {
      return this.$store.state.project.allKeywordsList;
    },

    getFilteredProjects() {
      return this.$store.state.project.projectsFilteredbyKeywords;
    },
  },
  ready: function () {
    this.getProjectTitles();
  },
  /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
  async mounted() {
    this.$store.dispatch("project/loadAllKeywords");

    /* 
    //this.$store.dispatch('project/loadProjectsFromBackend')
    this.projectList = this.$store.state.project.projectList;
    this.searchResult = this.projectList;

    for (var keyword of this.projectList) {
      console.log("test");
      this.existingKeywordList.push(keyword.schlagworter[0]);
    }
    console.log("keywordlist");
    console.log(this.existingKeywordList);
    this.keywordSearch(this.keyword2); */
  },
};
</script>
