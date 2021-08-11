<template>
    <div>
        <!-- <b-row class="title p-1 d-flex justify-content-center">
      <h3>Verwendete Tools</h3>
    </b-row> -->
        <b-row>
            <div
                class="card-body text-center"
                v-for="tool in listOfTools"
                :key="tool.date"
            >
                <div>
                    <b-form-checkbox
                        id="tool.date"
                        v-model="status"
                        name="checkbox-1"
                        value="checked"
                        unchecked-value="unchecked"
                    >
                        {{ tool.title }}
                    </b-form-checkbox>
                </div>
            </div>
        </b-row>
        <b-row class="d-flex justify-content-end">
            <b-modal
                id="tools_edit_modal"
                title="tools"
                cancel-title="Abbrechen"
            >
                <label for="neueTools">Benutztes Tool: </label>
                <input v-model="tool" type="text" placeholder="Tool" />
                <b-button @click="ok()"> OK </b-button>
            </b-modal>
            <b-button v-b-modal.tools_edit_modal>+</b-button>
        </b-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listOfTools: [
                { usedTool: "Tool 1" },
                { usedTool: "Tool 2" },
                { usedTool: "Tool 3" },
            ],
            tool: "",
            status: "not_accepted",
        };
    },
    methods: {
        ok() {
            var neueEingabe = {
                tool: this.tool,
            };
            this.listOfTools.push(neueEingabe);
            this.$store.dispatch("tool/createTool", neueEingabe);
            this.tool = "";
        },
    },
    mounted() {
        this.$store.dispatch("tool/loadToolsFromBackend", {
            projectId: this.$route.params.project_id,
        });
        this.listOfTools = this.$store.state.tool.listOfTools;
        console.log("tool startet");
    },
};
</script>
<style scoped>
.title {
    width: auto;
    /* height: 2em; */
    background-color: rgb(78, 78, 78);
}
.title h3 {
    color: white;
}
</style>