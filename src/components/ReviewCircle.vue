<template>
  <!-- Für extra Informationen über z-view 
    https://zircleui.github.io/docs/api/z-view.html#organize-your-content -->

  <z-view class="d-flex">
    <b> Kollaboratives Literarurreview: </b>
    <br />
    <b> Hildesheimer Ansatz </b>

    <div slot="default">
      <z-spot
        v-for="(el, index) in elements"
        button
        size="s"
        :distance="130"
        :angle="el.angle"
        :key="index"
        :image-path="el.image"
        @click.native="changeStyle(el)"
        :id="el.type"
        :class="{ isDone: el.done === true, red: el.done !== true }"
      >
        <div :class="[el.textPos]">{{ el.text }}</div>
        <div :class="[el.labelPos]">{{ el.label }}</div>
        <div :class="[el.textPos2]">{{ el.text2 }}</div>
        <div :class="[el.labelPos2]">{{ el.label2 }}</div>
      </z-spot>
    </div>
  </z-view>
</template>

<script>
export default {
  data() {
    return {
      elements: [
        {
          type: "theme",
          angle: 270,
          label: "Gruppe bilden",
          text: "Vorbereitung der Zusammenarbeit",
          textPos: "rightText",
          labelPos: "right1",
          done: false,
          text2: "Abschluss der Zusammenarbeit",
          textPos2: "leftText4",
          label2: "Gruppe auflösen",
          labelPos2: "left4",
        },
        {
          type: "theme",
          angle: 321.42,
          label: "Ziel und Umfang definieren",
          labelPos: "right2",
          text: "Forschungsfrage, Artefakt und Umfang",
          textPos: "rightText2",
          done: false,
        },
        {
          type: "theme",
          angle: 12.84,
          label: "Konzepte & Definition identifizieren",
          labelPos: "right3",
          text: "Konzepte, Domänen und working definitions",
          textPos: "rightText3",
          done: false,
        },
        {
          type: "theme",
          angle: 64.26,
          label: "Literatur suchen",
          labelPos: "right4",
          text: "Suchstrategie, Kriterien und Durchführung",
          textPos: "rightText4",
          done: false,
        },
        {
          type: "theme",
          angle: 115.68,
          label: "Daten extrahieren",
          labelPos: "left1",
          text: "Codingschema und Volltextanalyse",
          textPos: "leftText1",
          done: false,
        },
        {
          type: "theme",
          angle: 167.1,
          label: "Literatur analysieren & synthetisieren",
          labelPos: "left2",
          text: "Codingschema und Volltextanalyse",
          textPos: "leftText2",
          done: false,
        },

        {
          type: "mode",
          angle: 218.52,
          label: "Ergebnisse kommunizieren",
          labelPos: "left3",
          text: "Ergebnisaufbereitung und -verbreitung",
          textPos: "leftText3",
          done: false,
        },
        /*
                    {
                        type: 'mode', angle: 270, label: 'Gruppe auflösen', labelPos: 'left4',
                        text: 'Abschluss der Zusammenarbeit', textPos: 'leftText4', done: false
                    },
                    */
      ],
    };
  },
  methods: {
    changeStyle(el) {
      var changeColor = true;

      for (let element of this.elements) {
        console.log(element.label);
        console.log(el.label);
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

.right1 {
  bottom: 35%;
  position: relative;
  left: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.rightText {
  top: 20%;
  position: relative;
  left: 70%;
  background-color: lightgrey;
}

.right2 {
  bottom: 60%;
  position: relative;
  left: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.rightText2 {
  position: relative;
  left: 70%;
  background-color: lightgrey;
  top: 45%;
}
.right3 {
  bottom: 45%;
  position: relative;
  left: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.rightText3 {
  position: relative;
  left: 70%;
  background-color: lightgrey;
  top: 60%;
}

.right4 {
  position: relative;
  bottom: 15%;
  left: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.rightText4 {
  position: relative;
  left: 70%;
  background-color: lightgrey;
  top: 90%;
}

.left1 {
  position: relative;
  bottom: 15%;
  right: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.leftText1 {
  position: relative;
  right: 70%;
  background-color: lightgrey;
  top: 90%;
}

.left2 {
  bottom: 45%;
  position: relative;
  right: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.leftText2 {
  position: relative;
  right: 70%;
  background-color: lightgrey;
  top: 60%;
}

.left3 {
  bottom: 60%;
  position: relative;
  right: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.leftText3 {
  position: relative;
  right: 70%;
  background-color: lightgrey;
  top: 45%;
}
.left4 {
  bottom: 85%;
  position: relative;
  right: 70%;
  background-color: lightgrey;
  font-size: 16px;
}

.leftText4 {
  position: relative;
  right: 70%;
  background-color: lightgrey;
  bottom: 30%;
}

.inside {
  background-color: lightgrey !important;
}

.z-content {
  overflow: visible !important;
}

.z-label {
  white-space: unset !important;
}

.overflow {
  width: 400%;
}
</style>