<template>
    <div class="thread">
        <div>
            <p>
                <!-- Routerlink to open thread, show posts-->
                <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
                    {{thread.title}}
                </router-link>
            </p>
            <!-- show creator of this thread-->
            <p class="text-faded text-xsmall">
                By <a href="#">{{user.name}}</a>,
                <!-- show creating date-->
                <AppDate :timestamp="thread.publishedAt" />
                .
            </p>
        </div>
        <!-- show number of replies -->
        <div class="activity">
            <p class="replies-count">
                {{repliesCount}} replies
            </p>
        </div>
    </div>
</template>

<script>
  import {countObjectProperties} from '@/utils'
    export default {
        props: {
            thread: {
                required: true,
                type: Object
            }
        },

            computed: {
                // number of posts
                repliesCount() {
                return countObjectProperties(this.thread.posts) - 1
                },
                // get name of the user who created the thread 
                user () {
                    return this.$store.state.users[this.thread.userId]
                }
        }
    }
</script>

<style scoped>
</style>
