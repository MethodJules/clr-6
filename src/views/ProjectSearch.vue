<template>
<div>
          <input
            v-model="keyword"
            type="text"
            class="form-input"
            placeholder="Geben Sie ein Schlagwort ein, um die Projektliste zu filtern!"
          />
            <!-- free input or a list of all existing keywords where one can choose keywords for filtering -->
        <b-button @click="keywordSearch(keyword)">Suchen</b-button>

    <b-card-group columns v-for= "project in searchResult" :key="project.id">
    <b-card>
      <b-card-text> 
          <p>{{project.title}}</p>
          <div v-if="'istDozent' == 'istDozent'">
              <p>Kurzbeschreibung: {{project.kurzbeschreibung}}</p>
              <p>Betreuender Dozent: {{project.betreuenderDozent}}</p>
              <p>externe Mitwirkende: {{project.externeMitwirkende}}</p>
              <p>Schlagwörter: {{project.schlagworter}}</p>
          </div>    
      </b-card-text>
    </b-card>
    </b-card-group>
</div>
</template>


<script>
export default {


    name: "ProjectList",
    
    
  components: {
  },
  data() {
    return { 
      project: {
        kurzbeschreibung: "",
        betreuenderDozent: "",
        externeMitwirkende: "",
        schlagworter: "",
        id:"",
        title: ""
        /* TODO: array in backend dafür machen schlagwörter: [],
        TODO: array in backend dafür machen betreuenderDozent: [],
        TODO: array in backend dafür machen externeMitwirkende: [], */
      },

      projectList: [
      ],
    
    searchResult: [
      ],
      keyword: "",

    };
  },
  

  methods: {

      keywordSearch(keyword){
          console.log("test " + keyword)
          this.searchResult= []
          for( var project of this.projectList){
              console.log(project)
              if(project.schlagworter==keyword){
                  this.searchResult.push(project)
              }
          }
          console.log(this.searchResult)
      },

    fetchData(proj){
        this.project.titel=proj.titel
    },
    getProjectTitles: function(){
      this.$http.get('https://clr-backend.x-navi.de/jsonapi/node/projektanlegeformular', function(titel){
        this.$set('titel', titel);
        console.log(titel);
      })
    }
    
  },
  ready: function(){
    this.getProjectTitles();
  },
  /* created(){
    return this.$store.state.project[this.$route.params.titel]
    
  }, */
  async mounted() {
    this.$store.dispatch('project/loadProjectsFromBackend')
    this.projectList = this.$store.state.project.projectList
    console.log(this.projectList)
    console.log("mount projectList")

  },
};
</script>
