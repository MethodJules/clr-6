<template>
    <!-- Für extra Informationen über z-view 
    https://zircleui.github.io/docs/api/z-view.html#organize-your-content -->

    <z-view size="xxl">
        <div class="inside">
            <b> Kollaboratives Literarurreview: </b>
            <br />
            <b> Hildesheimer Ansatz </b>
        </div>
        <!-- TODO: Show text and text 2 insite circles -->
        <div slot="extension">
            <z-spot
                v-for="(el, index) in elements"
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
                <!-- <div :class="[el.textPos]">{{ el.text }}</div>
                <div :class="[el.labelPos]">{{ el.label }}</div>
                <div :class="[el.textPos2]">{{ el.text2 }}</div>
                <div :class="[el.labelPos2]">{{ el.label2 }}</div>
                 -->
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
                    iconType: "people",
                    iconType2: "columns-gap",
                },
                {
                    angle: 321.42,
                    label: "Ziel und Umfang definieren",
                    text: "Forschungsfrage, Artefakt und Umfang",
                    done: false,
                    labelPosition: "right",
                    iconType: "signpost-split",
                },
                {
                    angle: 12.84,
                    label: "Konzepte & Definition identifizieren",
                    text: "Konzepte, Domänen und working definitions",
                    done: false,
                    labelPosition: "right",
                    iconType: "diagram3",
                },
                {
                    angle: 64.26,
                    label: "Literatur suchen",
                    text: "Suchstrategie, Kriterien und Durchführung",
                    done: false,
                    iconType: "book",
                },
                {
                    angle: 115.68,
                    label: "Daten extrahieren",
                    text: "Codingschema und Volltextanalyse",
                    done: false,
                    iconType: "arrow-left-right",
                },
                {
                    angle: 167.1,
                    label: "Literatur analysieren & synthetisieren",
                    text: "Codingschema und Volltextanalyse",
                    done: false,
                    labelPosition: "left",
                    iconType: "vector-pen",
                },

                {
                    angle: 218.52,
                    label: "Ergebnisse kommunizieren",
                    text: "Ergebnisaufbereitung und -verbreitung",
                    done: false,
                    labelPosition: "left",
                    iconType: "card-checklist",
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
                    el.text = "Abschluss der Zusammenarbeit";
                    el.iconType = "columns-gap";
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