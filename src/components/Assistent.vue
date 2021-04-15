<template>
    <b-container>
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        


                        
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                
                
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>
            </b-col>
            <b-col>

                <div>
            
                <!-- <div v-for="assistent in assistents" :key="assistent.hilfstext"> -->

                 <!-- modal des Assistenten mit Angabe von Text und der Angabe der gespeicherten 
                 Informationen in der Datenbank -->   
                <b-button v-b-modal.modal-1 size="lg" variant="primary" class="mb-2"> 
                <!-- Assistent als Fragezeichen Symbol -->
                <b-icon icon="question-circle-fill" aria-label="Help"></b-icon>
                </b-button>
                <!-- Hilfstext von Assistent wird mit Modal Bootstrap ausgegeben, wenn man auf das Fragezeichen klickt --> 
                <b-modal id="modal-1" title="Assistent">
                <p class="my-4">Hallo! Ich sehe, du möchtest wissen, was du in dieser Phase machen sollst.</p>
                <p class="my-4">Diese Phase dient dazu...</p>

                <div class= "card" v-for="assistent in assistents" :key="assistent.date">
                  {{assistent.hilfstext}}

                </div>

               
                

                </b-modal>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

export default {
  /* Datenausgabe */
    data() {
        return {
            assistents: [
                {hilfstext: '1'},
                
            ],
        }

            
            
    },

    


    //Die in der Datenbank gespeicherten Hilfstexte werden hiermit angegeben
    /* Anbindung an Backend mit Get Operator, um die Daten (Hilfstexte von Assistent) lesen zu können */
    mounted() {
        this.$store.dispatch('assistent/loadAssistentFromBackend')
        this.assistents = this.$store.state.assistent.assistents

    },

    
}
</script>











