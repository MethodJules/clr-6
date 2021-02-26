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
    }
  }
</script>