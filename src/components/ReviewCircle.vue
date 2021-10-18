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
        return {};
    },
    computed: {
        ...mapGetters({
            phases: "phases/getPhasesOfProject",
        }),
    },
    methods: {
        changeStyle(el) {
            let changeColor = true;
            for (let element of this.phases) {
                if (element !== el) {
                    if (element.done == false) {
                        changeColor = false;
                    }
                } else {
                    console.log("Ende erreicht");
                    break;
                }
            }
            if (changeColor) {
                this.$store.dispatch("phases/closePhase", el);
            }
        },
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