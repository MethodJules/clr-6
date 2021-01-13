<template>
    <div class="home">
        <h1>Create New Member</h1>
        <form @submit.prevent="save">
            <div class="form-group">
                Member:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="member" />
                Role:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="role" />
                Image:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="img" />

            </div>

            <div class="form-actions">
                <button class="btn-red">Add Member</button>
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
