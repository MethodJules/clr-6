<template>
    <!-- TODO: main page burada olacak -->
    <b-container fluid class="p-0 m-0">
        <MenueLeiste />

        <b-row class="page-container">
            <b-col class="linkeSeite m-0 p-0" md="2">
                <b-row class="m-0 p-0">
                    <b-col class="m-0">
                        <TodoList />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col class="d-flex m-0">
                        <Kalender />
                    </b-col>
                </b-row>
            </b-col>

            <b-col class="mainContent m-0 p-0">
                <router-view :key="$route.path"></router-view>
            </b-col>
            <!-- Sobald der Nutzer auf die Projektliste geht, blendet er 
        die Komponente SeitenNavigation aus . Siehe https://stackoverflow.com/questions/56681106/vue-hide-view-components-conditionally-based-on-url-->
            <b-col
                v-if="!isChanged"
                class="
                    d-flex
                    flex-column
                    justify-content-between
                    p-0
                    m-0
                    rechtseite
                "
                md="1"
            >
                <b-row>
                    <b-col class="m-0">
                        <SeitenNavigation />
                    </b-col>
                </b-row>
            </b-col>
            <b-col v-else> </b-col>
        </b-row>
        <!-- 
                <b-row class="untereLeiste p-4 d-flex align-center">
                    <h3>Footer oder Impressium vielleicht</h3>
                </b-row> -->
    </b-container>
</template>
<script>
import SeitenNavigation from "@/components/SeitenNavigation.vue";
import TodoList from "@/components/TodoList.vue";
import MenueLeiste from "@/components/MenueLeiste.vue";
import Kalender from "@/components/Kalender.vue";
//import ProjectList from "@/views/ProjectList.vue"

export default {
    props: {
        showRightMenu: Boolean,
    },

    components: {
        SeitenNavigation,

        //ProjectList,
        TodoList,
        MenueLeiste,
        Kalender,
    },
    data() {
        return {
            zugangsKennung: "",
            passwort: "",
            registrierungsKennung: "",
            registrierungsPasswort: "",
            matrikelnummer: "",
            nameState: null,
            showMenu: true,
            eintragTodo: {
                todo: "",
            },
        };
    },

    methods: {
        closeMenu() {
            this.showMenu = false;
        },
    },
    computed: {
        account() {
            return this.$store.state.sparky_api.account;
        },
    },

    mounted() {
        //this.$store.dispatch("todo/loadToDoFromBackend");
        this.$store.dispatch("drupal_api/loadTokensfromSessionStorage");
        this.listOfToDos = this.$store.state.todo.listOfToDos;

        // we need to take some values one time from database.
        // When we take them in cpomponent mounted or created, it brings the values every time we renew the component.
        // this problem occurs the commits that we use push in it.
        // When we set values then it brings again but it seems that nothing has changed in the page.
        //this.$store.dispatch("daily_scrum/loadDailysFromBackend");
    },
};
</script>
<style>
.row {
    width: 100% !important;
    margin: 0 !important;
}
.page-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem !important;
}
@media (max-width: 765px) {
    .page-container {
        flex-wrap: wrap-reverse !important;
    }
}
.linkeSeite {
    min-width: 25rem;
}
.rechtseite {
    min-width: 25rem;
}
.mainContent {
    padding: 0 !important;
    min-width: 25rem;
    height: 100%;
    width: 100%;
}
.postfach {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
}
.chat {
    text-align: center;
}
.login {
    margin-top: 25rem;
}
.untereLeiste {
    height: 100%;
    border: 1px solid black;
    margin: 0;
}
</style>