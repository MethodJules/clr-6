<template>
    <div class="home">
        <h2>Gruppenmitglied hinzufügen</h2>
        <b-form @submit.prevent="save">
            <div class="form-group">
                Benutzer:
                <!-- <label for="input-with-list"></label> -->
                <div container>
                <input list="input-list"
                       id=""
                       class="form-input"
                       v-model="member"
                       placeholder="Benutzer*in suchen"
                       
                       
                       />
                <b-form-datalist id="input-list" :options="options"></b-form-datalist>
                </div>
                Rolle:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="role" />

                       
                        
                
                        


                       
               

            </div>
        
            <b-container>
            <b-row>
                <b-col>
           
                <button>Speichern</button>

                </b-col>

                
            </b-row>
            </b-container>
            
        </b-form>
    </div>
</template>

<script>

export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
            member: null,
            role: '',
            options: [
           
            { value: 'Max Müller', text: 'Max Müller' },
            { value: 'Sara Becker', text: 'Sara Becker' },
            { value: 'Kim Johnson' , text: 'Kim Johnson' },
            
            ]
            
        }
    },
    methods: {
        save() {
            const member = {
                name: this.member,
                role: this.role,
               
            }
            this.$store.dispatch('members/addMember', member)

            this.$router.push({ name: 'Groupmanagement'})
        }
    }
}
</script>
