<template>
                <div>
        <b-dropdown text="Zur Reflexion" class="m-2">
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Gruppe bilden'}}">Gruppe bilden</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Ziel & Umfang definieren'}}">Ziel & Umfang definieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Konzepte & Definitionen'}}">Konzepte & Definitionen</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Literatur suchen'}}">Literatur suchen</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Daten extrahieren'}}">Daten extrahieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Analyse & Synthese'}}">Analyse & Synthese</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Ergebnisse kommunizieren'}}">Ergebnisse kommunizieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'ReflexionView', params: { reflexionsPhase: 'Gruppe auflösen'}}">Gruppe auflösen</b-dropdown-item>
        </b-dropdown>
                </div>
</template>