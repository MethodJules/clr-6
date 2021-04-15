<template>
    <div class="home">
        <h5>Gruppenmitglied hinzufügen</h5>
        <form @submit.prevent="save">
            <div class="form-group">
                Benutzer/in:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="member" />
                
               

                

            </div>

            <div class="form-actions">
                <button class>Add Member</button>
            </div>
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
            role: '',
            img: ''
        }
    },
    methods: {
        save() {
            const member = {
                name: this.member,
                role: this.role,
                img: this.img
            }
            this.$store.dispatch('members/addMember', member)

            this.$router.push({ name: 'Groupmanagement'})
        }
    }
}
</script>
