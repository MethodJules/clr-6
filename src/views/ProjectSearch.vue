<template>
  <div>
    <vue-simple-suggest
      v-model="keyword"
      type="text"
      :list="simpleSuggestionList"
      :filter-by-query="true"
      placeholder="Geben Sie ein Schlagwort ein, um die Projektliste zu filtern!"
    />
    <!--     Vue error here -> index of both v-for loops are numbers and at least index 0 exists in both loops, if not more. does not lead to any problems for now. fix?
 -->
    <b-badge v-for="(keyword, index) in keywords" :key="index" variant="primary"
      >{{ keyword }}
      <BIconXCircleFill v-on:click="deletekeyword(keyword)"> </BIconXCircleFill
    ></b-badge>

    <!-- free input or a list of all existing keywords where one can choose keywords for filtering -->
    <br />
    <b-button @click="keywordSearch(keyword)">Suchen</b-button>

    <b-card-group v-for="(project, index) in getFilteredProjects" :key="index">
      <b-card border-variant="dark" :header="project.title" align="center">
        <b-card-text>
          <div v-if="'istDozent' == 'istDozent'">
            <p>Kurzbeschreibung: {{ project.kurzbeschreibung }}</p>
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

  data() {
    return {
      user: { width: 200, height: 200, class: "m1" },
      // projectList: [],
      //searchResult: [],
      // existingKeywordList: [],
      keywords: [],
      keyword: "",
    };
  },

  methods: {
    simpleSuggestionList() {
      return this.getKeyWords;
    },

    deletekeyword(keyword) {
      var keywordIndex = this.keywords.indexOf(keyword);
      this.keywords.splice(keywordIndex, 1);
      this.$store.dispatch("project/loadProjectFilterbyKeyword", this.keywords);
      // this.adjustKeywords();
    },

    keywordSearch(keyword) {
      if (keyword != "") {
        this.keywords.push(keyword);
        this.$store.dispatch(
          "project/loadProjectFilterbyKeyword",
          this.keywords
        );
        this.keyword = "";
      }
    },

    /*  
   adjustKeywords() {
      this.searchResult = [];
      for (var project of this.projectList) {
        for (var keyword of this.keywords) {
          if (project.schlagworter == keyword) {
            this.searchResult.push(project);
          }
        }
        if (this.keywords < 1) {
          this.searchResult = this.projectList;
        }
      }
    }, */
  },
  computed: {
    getUserRole() {
      return this.$store.state.drupal_api.user.role;
    },

    getKeyWords() {
      return this.$store.state.project.allKeywordsList;
    },

    getFilteredProjects() {
      return this.$store.state.project.projectsFilteredbyKeywords;
    },
  },

  async mounted() {
    if (this.$route.params.keyword.length > 0) {
      this.keywordSearch(this.$route.params.keyword.trim());
    }
    this.$store.dispatch("project/loadAllKeywords");
  },
  beforeDestroy() {
    this.$store.state.project.projectsFilteredbyKeywords = [];
  },
};
</script>
