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
        <div slot="extension">
            <z-spot
                v-for="(el, index) in phases"
                button
                size="s"
                :distance="130"
                :angle="el.angle"
                :key="index"
                :image-path="el.image"
                @click.native="goToPhase(index)"
                :id="el.id"
                :class="{ isDone: el.done === true, red: el.done !== true }"
                :label-pos="el.labelPosition"
                v-b-popover.hover.top="el.label"
            >
                <!-- :title="el.text" removed, because text is not needed here and might get too big  -->
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
        return {};
    },
    computed: {
        ...mapGetters({
            phases: "project_phases/getPhasesOfProject",
        }),

        getProjectID() {
            return this.$route.params.project_id;
        },
    },
    methods: {
        goToPhase(phase_number) {
            this.$router.push({
                name: "PhaseTemplate",
                params: {
                    phase_number: phase_number,
                    project_id: this.getProjectID,
                },
            });
        },
    },
  mounted() {
    // const zircle = document.querySelector("#z-container");
    // console.log(zircle);
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