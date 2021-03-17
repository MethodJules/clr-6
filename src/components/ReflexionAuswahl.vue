<template>
                <b-col cols="8" class="mitte border border-primary">
                    <router-view></router-view>
                   
                    

                    <b-dropdown text="Zur Reflexion" class="m-2">
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Gruppe bilden</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Ziel & Umfang definieren</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Konzepte & Definitionen</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Literatur suchen</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Daten extrahieren</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Analyse & Synthese</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Ergebnisse kommunizieren</b-dropdown-item>
                    <b-dropdown-item link :to="{name: 'Reflexion'}">Gruppe auflösen</b-dropdown-item>
                    
                    
                    </b-dropdown>
                </b-col>
</template>