<!-- Create new Thread Component-->
<template>

        <div>
            <h1>Create New Thread</h1>
            <div class="scroll">
                <!-- New Thread Editor -->
                <NewThreadEditor @save="newThread"
                                 :forumId="id" />

            </div>
        </div>

</template>

<script>
    import NewThreadEditor from '@/components/NewThreadEditor'


    export default {
        name: 'Home',
        components: {
            NewThreadEditor
        },
        props: {
            id: {
                required: true,
                type: String
            }
        },

        methods: {
            // create new Thread
            async newThread({ thread, post }) {
                // add new Thread to store
                await this.$store.dispatch('createNewThread', [thread, post])
                // create new routerlink to created forum
                this.$router.push({ name: 'ForumThreads', params: { id: this.id } })
            }
        }

    }

</script>
<style scoped>

    .scroll {
        overflow: scroll;
        height: 100%;
        overflow: scroll;
        width: 100%;
        padding: 10px;
    }
    h1 {
        color: #c93e37;
    }

</style>
s