<!-- Create new Member-->
<template>
    <div class="home">
        <h1>Create New Member</h1>
        <!-- Form to create new Member-->
        <form @submit.prevent="save">
            <div class="form-group">
                <!-- Member -->
                Member:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="member" />
                <!-- Role -->
                Role:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="role" />
                <!-- Image -->
                Image:
                <input name=""
                       id=""
                       class="form-input"
                       v-model="img" />

            </div>
            <!-- Button, creates new Member add add him to list of members-->
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
        // create new Member and add him to memberlist in store
        save() {
            const member = {
                name: this.member,
                role: this.role,
                img: this.img
            }
            this.$store.dispatch('members/addMember', member)

            // go back to groupmanagement-page
            this.$router.push({ name: 'Groupmanagement'})
        }
    }
}
</script>
