<template>
    <!-- Für extra Informationen über z-view 
    https://zircleui.github.io/docs/api/z-view.html#organize-your-content -->

    <z-view size="xxl">
        <div class="inside">
            <b> Kollaboratives Literarurreview: </b>
            <br />
            <b> Hildesheimer Ansatz </b>
            <br />
        </div>
        <!-- TODO: Show text and text 2 insite circles -->
        <div slot="extension">
            <z-spot
                v-for="(el, index) in phases"
                button
                size="s"
                :distance="130"
                :angle="el.angle"
                :key="index"
                :image-path="el.image"
                @click.native="changeStyle(el)"
                :id="el.id"
                :class="{ isDone: el.done === true, red: el.done !== true }"
                :label-pos="el.labelPosition"
                v-b-popover.hover.top="el.text"
                :title="el.label"
            >
                <b-icon
                    :icon="el.iconType"
                    color="white"
                    font-scale="2"
                ></b-icon>
            </z-spot>
        </div>
    </z-view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            // elements are coming from getter. We are using now phases in ...mapGetters
        };
    },
    computed: {
        //sorts phases array from backend to let it go from 0 to 7 like the elements above
        //infinite update loop? -> put sort in load method so it is sorted to begin with and then just get it here
        //then call method to change phases to true before mount -> in button which leads to dashboard or in home? weiterreichen als prop von home an circle?

        ...mapGetters({
            phases: "phases/getPhasesOfProject",
        }),
    },
    methods: {
        changeStyle(el) {
            this.$store.dispatch("phases/closePhase", el);

            // rest of this method MOVED TO CLOSE_PHASE mutation:
            // we are doing this part in phase.js file
        },
        // getPhaseAbschluss, this soting part is done by getter in phase.js
        // look getPhasesOfProject
    },
};
</script>



<style scoped>
.z-shape {
    background-color: white !important;
    border-color: black !important;
    border-width: 2px;
}

.isDone {
    background-color: green !important;
}
.red {
    background-color: red !important;
}
</style>

<style>
.done {
    background-color: red;
}

.inside {
    /* background-color: lightgrey !important; */
    font-size: 1.3rem;
}

.z-content {
    overflow: visible !important;
}

@media (max-width: 1600px) {
    .z-label {
        white-space: unset;
    }
}

.overflow {
    width: 400%;
}
</style>