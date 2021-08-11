<template>
    <div>
        <b-dropdown text="Zur Reflexion" class="">
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 0 } }"
                >Gruppe bilden</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 1 } }"
                >Ziel & Umfang definieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 2 } }"
                >Konzepte & Definitionen</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 3 } }"
                >Literatur suchen</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 4 } }"
                >Daten extrahieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 5 } }"
                >Analyse & Synthese</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 6 } }"
                >Ergebnisse kommunizieren</b-dropdown-item
            >
            <b-dropdown-item
                link
                :to="{ name: 'ReflexionView', params: { reflexionsPhase: 7 } }"
                >Gruppe auflösen</b-dropdown-item
            >
        </b-dropdown>
    </div>
</template>