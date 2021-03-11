<template>
    <div>
    <b-row>
        <h3><b-badge>Verwendete Tools</b-badge></h3>
    </b-row>
    <b-row>
        
        <div class="card-body text-center "  v-for="tool in listOfTools" :key="tool.usedTool">
            <div >
                <b-form-checkbox :id="tool.usedTool" v-model="status" name="checkbox-1" value="checked" unchecked-value="unchecked">{{tool.usedTool}}</b-form-checkbox>
            </div>
        
        </div>
    
    </b-row>
    <b-row>
      <b-col col="6">
      </b-col>
      <b-col>
        <b-modal id="tools_edit_modal" title="tools">
          <label for = "neueTools">Benutztes Tool: </label>
          <input v-model="tool" type ="text" placeholder="Tool">
          <b-button @click="ok()">
          OK
          </b-button>
        </b-modal>
        <b-button v-b-modal.tools_edit_modal>+</b-button>
      </b-col>
    </b-row>

    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listOfTools: [
            {usedTool: 'Tool 1'},
            {usedTool: 'Tool 2'},
            {usedTool: 'Tool 3'},
            
        ]
      }
    },
    methods:{
      ok(){
        var neueEingabe ={
          usedTool: this.tool
        };
        this.listOfTools.push(neueEingabe)
        this.$store.dispatch('tool/createTool', neueEingabe)
        this.tool= ''
        
      }
    },
    mounted() {
    this.$store.dispatch('tool/loadToolFromBackend')
    this.listOfTools = this.$store.state.usedTool.listOfTools
    
  }
  }
</script>