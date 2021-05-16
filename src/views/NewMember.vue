<template>
    <div class="home">
        <h2>Gruppenmitglied hinzufügen</h2>
        <form @submit.prevent="save">
            <div class="form-group">
                Benutzer:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="member" />
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
            
        </form>
    </div>
</template>

<script>

export default {
    name: 'Home',
    components: {
    },
    data() {
        return {
            member: '',
            role: ''
            
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
