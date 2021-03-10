<template>
    <div>
    <b-row class="title">
        
        <h3 >Output</h3> 
    </b-row>
    <b-row>
        
        <div class="card-body text-center "  v-for="outputDocs in listOfOutputs" :key="outputDocs.file">
            <div class="text-center">
                {{outputDocs.file}}
            </div>
        
        </div>
    
    </b-row>
    <b-row>
      <b-col cols="6">
      </b-col>
      <b-col>
        <b-modal id="output_edit_modal" title="Output">
            <b-form-textarea id="output_edit_form_textarea" rows="6" v-model="outputFile"></b-form-textarea>
            <!-- https://www.raymondcamden.com/2019/08/08/drag-and-drop-file-upload-in-vuejs -->
            <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
              <h2>Files to Upload (Drag them over)</h2>
              <ul>
                <li v-for="file in files" :key="file">
                {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
                </li>
               </ul>
  
              <button :disabled="uploadDisabled" @click="upload">Upload</button>
            </div>
                            
        </b-modal>
        <b-button v-b-modal.output_edit_modal>+</b-button>
      </b-col>

    </b-row>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        listOfOutputs: [
            {file: 'Outputdatei 1'},
            {file: 'Outputdatei 2'},
            {file: 'Outputdatei 3'}
        ]
      }
    },
    methods:{
      upload() {
      
      let formData = new FormData();
      this.files.forEach((f,x) => {
        formData.append('file'+(x+1), f);
      });
      
      fetch('https://httpbin.org/post', {
        method:'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
         console.log('done uploading', res);
      })
      .catch(e => {
        console.error(JSON.stringify(e.message));
      });
      
    }
    }
  }
</script>
<style>
    
    .title {
        width: auto;
        height: 100 px;
        background-color: rgb(78, 78, 78);
        
    }
    h3{
        color: white;
    }
</style>