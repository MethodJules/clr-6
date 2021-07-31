<template>
    <!-- Für extra Informationen über z-view 
    https://zircleui.github.io/docs/api/z-view.html#organize-your-content -->

    <z-view size="xl">
        <b> Kollaboratives Literarurreview: </b>
        <br />
        <b> Hildesheimer Ansatz </b>
        <!-- TODO: Show text and text 2 insite circles -->
        <div slot="default">
            <z-spot
                v-for="(el, index) in elements"
                button
                size="xs"
                :distance="130"
                :angle="el.angle"
                :key="index"
                :image-path="el.image"
                @click.native="changeStyle(el)"
                :id="el.id"
                :class="{ isDone: el.done === true, red: el.done !== true }"
                :label="el.label"
                :label-pos="el.labelPosition"
            >
                <!-- <div :class="[el.textPos]">{{ el.text }}</div>
                <div :class="[el.labelPos]">{{ el.label }}</div>
                <div :class="[el.textPos2]">{{ el.text2 }}</div>
                <div :class="[el.labelPos2]">{{ el.label2 }}</div> -->
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
                    angle: 270,
                    label: "Gruppe Bilden",
                    text: "Vorbereitung der Zusammenarbeit",
                    done: false,
                    text2: "Abschluss der Zusammenarbeit",
                    label2: "Gruppe auflösen",
                    labelPosition: "top",
                    id: "gruppeBilden",
                },
                {
                    angle: 321.42,
                    label: "Ziel und Umfang definieren",
                    text: "Forschungsfrage, Artefakt und Umfang",
                    done: false,
                    labelPosition: "right",
                },
                {
                    angle: 12.84,
                    label: "Konzepte & Definition identifizieren",
                    text: "Konzepte, Domänen und working definitions",
                    done: false,
                    labelPosition: "right",
                },
                {
                    angle: 64.26,
                    label: "Literatur suchen",
                    text: "Suchstrategie, Kriterien und Durchführung",
                    done: false,
                },
                {
                    angle: 115.68,
                    label: "Daten extrahieren",
                    text: "Codingschema und Volltextanalyse",
                    done: false,
                },
                {
                    angle: 167.1,
                    label: "Literatur analysieren & synthetisieren",
                    text: "Codingschema und Volltextanalyse",
                    done: false,
                    labelPosition: "left",
                },

                {
                    angle: 218.52,
                    label: "Ergebnisse kommunizieren",
                    text: "Ergebnisaufbereitung und -verbreitung",
                    done: false,
                    labelPosition: "left",
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
                if (el.label == "Gruppe Bilden") {
                    el.label = "Gruppe Auflösen";
                }
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
    font-size: 1rem;
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