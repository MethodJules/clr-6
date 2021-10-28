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
        <b-icon :icon="el.iconType" color="white" font-scale="2"></b-icon>
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

    getProjectID() {
      return this.$route.params.project_id;
    },
  },
  methods: {
    changeStyle(el) {
      let changeColor = true;
      //this if is for when the clicked phase is not finished - looks if all phases before where finished, thus no phase can be skipped -> if yes then closes the phase
      if (el.done == false) {
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
          console.log(changeColor);
          el.done = true;
          this.$store.dispatch("phases/closePhase", {
            phase: el,
            open_close_phase: true,
          });
        }
        //this if is for when the clicked phase is already finished - looks if all phases after are not finished,
        //thus not a random phase can be opened again but only the latest finished phase-> if yes then reopens the phase
      } else if (el.done == true) {
        for (var i = this.phases.length - 1; i >= 0; i--) {
          if (this.phases[i] !== el) {
            if (this.phases[i].done == true) {
              changeColor = false;
            }
          } else {
            console.log("Ende erreicht");
            break;
          }
        }

        if (changeColor) {
          console.log(changeColor);
          //el.done=false does not work. Why? el.done=true works as expected
          el.done = false;
          //actually reopens the phase now
          this.$store
            .dispatch("phases/closePhase", {
              phase: el,
              open_close_phase: false,
            })
            .then(() => {
              //but this works now??
              el.done = false;
              console.log(el.done);
            });
        }
      }
    },
    goToPhase(phaseid) {
      console.log(phaseid);
      console.log(this.getProjectID);
      this.$router.push({
        name: "PhaseTemplate",
        params: { phase_id: phaseid, project_id: this.getProjectID },
      });
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