<template>
    <b-col class="border border-dark">  

                
   
               
                <b-container fluid>

                <b-row>    
                    
                <b-row>
                        
                    <b-col cols="8"> <h5> Persönliche Daten: </h5> </b-col>
                </b-row>
                        
                        <b-row>
                            <b-col sm="5"> <strong> Name: </strong>  </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="5"> <strong> Matrikelnummer: </strong> </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="5"> <strong> E-Mail: </strong> </b-col>
                        </b-row>
                        <br>

                    <b-row>
                        <br>
                    
                    </b-row>

                        <b-row>
                        
                        <b-col cols="8"> <h5> Profildaten: </h5> </b-col>
                        </b-row>

                        <b-col sm="5">
                            
                            <label for="input-1" > <strong> Studiengang </strong> </label> 
                        </b-col>
                       
                        <b-col sm="10">
                        
                        <b-form-input
                            v-model="studiengang"
                            v-on:input="$v.studiengang.$touch"
                            v-bind:class="{error: $v.studiengang.$error, valid: $v.studiengang.$dirty && !$v.studiengang.$invalid}"
                            id="input-1"
                            > 
                            </b-form-input>  
                                
                        <br>
                        </b-col>
                         
                        <b-col sm="5">
                            
                            <label for="input-2"> <strong> Durchgeführte Literaturreviews </strong> </label>
                        </b-col>
                        
                        <b-col sm="10">
                        <b-form-input
                            v-model="anzahl_literaturreviews"
                            v-on:input="$v.anzahl_literaturreviews.$touch"
                            v-bind:class="{error: $v.anzahl_literaturreviews.$error, valid: $v.anzahl_literaturreviews.$dirty && !$v.anzahl_literaturreviews.$invalid}"
                            id="input-2"
                            >
                           
                        </b-form-input>
                        
                        <br>
                        </b-col>

                        <b-row>

                        <b-col sm="5">
                            
                            <label for="textfeld-3">E-Mail im Profil anzeigen? <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="status"
                                    name="checkbox-1"
      
                                >
                                </b-form-checkbox> </label>        
                        
                        
                        </b-col>
                        

                        

                        </b-row>

                        <b-row>
                            <b-col sm="7">
                                <strong>Ich kenne mich in den folgenden... aus:</strong> <br>
                            </b-col>
                            <br>
                        </b-row>

                        <b-col sm="10">
                            <br>
                            
                            <label for="input-3"><strong> Datenbanken & Suchmaschinen </strong> </label>
                            <b-row>
                                z.B. AISeL, IEEE, Google Scholar, Web of Science, ...
                            </b-row>
                        </b-col>

                        <b-col sm="10">
                        <b-form-input
                            v-model="datenbanken"
                            v-on:input="$v.datenbanken.$touch"
                            v-bind:class="{error: $v.datenbanken.$error, valid: $v.datenbanken.$dirty && !$v.datenbanken.$invalid}"
                            id="input-3"
                            >
                          
                        </b-form-input>  

                        
                        

                        <br>

                        </b-col>
                         


                        <b-col sm="5">
                            
                            <label for="input-4">  <strong> Referenzmanagement-Tools </strong> </label>
                            <b-row>
                                z.B. Citavi, Mendeley, Endnote, ...
                            </b-row>
                        </b-col>
                        
                        <b-col sm="10">
                        <b-form-input
                            v-model="referenztool"
                            v-on:input="$v.referenztool.$touch"
                            v-bind:class="{error: $v.referenztool.$error, valid: $v.referenztool.$dirty && !$v.referenztool.$invalid}"
                            id="input-4"
                            >
                          
                        </b-form-input>

                        <br>
                        
                        </b-col>

                        <b-col sm="7">
                            
                            <label for="input-5"> <strong> Analysetools </strong> </label>
                            <b-row>
                                z.B. Excel, MAXQDA, NVivo, R, ...
                            </b-row>
                        </b-col>
                        
                        <b-col sm="10">
                        <b-form-input
                            v-model="analysetool"
                            v-on:input="$v.analysetool.$touch"
                            v-bind:class="{error: $v.analysetool.$error, valid: $v.analysetool.$dirty && !$v.analysetool.$invalid}"
                            
                            id="input-5">
                           
                        </b-form-input>


                        <br>
                        </b-col>

                         <b-col sm="7">
                            
                            <label for="bild"> <strong> Profilbild </strong> </label>

                            <div class="hello">    
                            <picture-input 
                                ref="pictureInput" 
                                @change="onChange"
                                width="600" 
                                height="600" 
                                margin="16" 
                                accept="image/jpeg,image/png" 
                                size="10" 
                                buttonClass="btn"
                                :customStrings="{
                                    //upload: '<h1>Bild ändern</h1>',
                                    drag: 'Bild hochladen'
                                }">
                                
                            </picture-input> 
                            </div>
                            
                        </b-col>
                        
                        <div id="app">
                        <b-row>

                        <b-col> </b-col>

                        
                        
                        <b-col> </b-col>

                        <b-col  lg="4" class="pb-2"><b-button @click="addProfile()">Speichern </b-button></b-col>


                        <b-col  lg="4" class="pb-2"><b-button to="/einstellungen">Abbrechen</b-button></b-col>
                        
                        
                        </b-row>
                        </div>
                        
                        

                       



                    </b-row>

                    

                    

                </b-container>

                <transition name="fade" mode="out-in">
                        <div v-if="testButClicked" class="alert" role="alert">
                            Erfolgreich Gespeichert !
                        </div>
                        </transition> 
            
    </b-col>
</template>

<script>





    
 
import { required, minLength } from 'vuelidate/lib/validators'
import PictureInput from 'vue-picture-input'

export default {
        
    
        

    
    
    data() {
        return {
            testButClicked: false,
            reflexionList:[],
            studiengang: '',
            anzahl_literaturreviews: '',
            datenbanken: '',
            referenztool: '',
            analysetool: '',
           
            
        }
    },

    components: {
        PictureInput
    },

    validations: {

        studiengang: { required, minLength: minLength (1) },
        anzahl_literaturreviews: { required, minLength: minLength (1)},
        datenbanken: { required, minLength: minLength (1) },
        referenztool: { required, minLength: minLength (1) },
        analysetool: { required, minLength: minLength (1) },


    },
    methods: {

        /** Profil wird in das Backend geladen */
        addProfile() {
            this.$v.$touch();

            if(!this.$v.$invalid){
                console.log('title: ${this.titela}')

                var ausgabe = {

                studiengang: this.studiengang,
                anzahl_literaturreviews:  this.anzahl_literaturreviews,
                datenbanken: this.datenbanken,
                referenztool: this.referenztool,
                analysetool: this.analysetool

                };

                 this.testButClicked = true;
            
            this.$store.dispatch('profile/createProfile', ausgabe)

            /* var output = {
                 
                studiengang: this.studiengang,
                anzahl_literaturreviews:  this.anzahl_literaturreviews,
                datenbanken: this.datenbanken,
                referenztool: this.referenztool,
                analysetool: this.analysetool

            };

          
          this.$store.dispatch('profile/updateProfile', output) */
         

            } else {
                alert("Bitte alles ausfüllen")
            }
                
            }
          
            /* To Do: überprüfen ob schon eine reflexion zu dieser phase von dieser person angefertigt wurde 
            -> kein neuer Eintrag, alte Reflexion kann überschrieben oder aktualisiert werden
            */          
           
            
        },

         

        onChange (image) {
            
           
        if (image) {
            
        this.image = image
        }
        },


    watch:{
    testButClicked(val){
      if (val){
        setTimeout(()=>this.testButClicked=false,1000);
      }
    }
  },    
       
        
    /** lädt alle Profile aus dem Backend */
    mounted() {
    this.$store.dispatch('profile/loadProfileFromBackend')
    

    this.profileData = this.$store.state.profile.profileData
   
    
  },

  

  
       

    
}
</script>
<style scoped>
body {
  padding: 20px;
  font-family: Helvetica;
}

#app {

  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

.alert {
  background-color: lightgreen;
  padding: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.error {
  border-color: red;
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}

.valid {
  border-color: #5A5;
  background: #EFE;
}

.valid:focus {
  outline-color: #8E8;
}
</style>

