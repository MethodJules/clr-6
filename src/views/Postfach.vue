<template>
<div>
    
    <div>
    <b-button v-b-modal.modal-5><b-icon icon="envelope"></b-icon></b-button>
    

    <b-modal id="modal-5" title="Benachrichtigung" cancel-title="Abbrechen">
    <p class="my-4"></p> 

    <!-- Liste von Benachrichtigungen  -->
        <div class="card" v-for="postfach in listOfPostfach" :key="postfach.date">
            <div class="card-body text-center">
                <b-form :id="postfach.date" v-model="status">
                    {{postfach.postfach}}
                    <b-button @click="deletePostfach(postfach)" class="btn btn-s"> <b-icon icon="trash-fill" > </b-icon></b-button></b-form>

                    {{postfach.nachrichten}}
            </div>
        </div>
    
    
        

       
    </b-modal>   
    </div>       
    </div>

</template>

<script>
export default {
    components:{
    },
    data(){
            return{
                listOfPostfach: [{postfach:"postfach1"} , {postfach:"postfach2"}, {postfach:"postfach3"}],
                
            }
    },
    methods:{
        
        deletePostfach(postfach){
                //Löschen einer Benachrichtigung
                //this.listOfPostfach.splice(this.listOfPostfach.indexOf(postfach), 1)
                //alert("Delete");
              
            this.$store.dispatch('postfach/deletePostfach', postfach)
            
        }
    },
    //Die in der Datenbank gespeicherten Benachrichtigungen werden hiermit aufgelistet
    mounted(){
        this.$store.dispatch('postfach/loadPostfachFromBackend')
        this.listOfPostfach = this.$store.state.postfach.listOfPostfach
    }
}
</script>



