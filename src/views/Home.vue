<template>
    <div>


      <z-canvas :views="$options.components">

            <ReviewCircle> </ReviewCircle>

        </z-canvas>

        <b-dropdown text="Zur Reflexion" class="m-2">
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Gruppe bilden'}}">Gruppe bilden</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Ziel & Umfang definieren'}}">Ziel & Umfang definieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Konzepte & Definitionen'}}">Konzepte & Definitionen</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Literatur suchen'}}">Literatur suchen</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Daten extrahieren'}}">Daten extrahieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Analyse & Synthese'}}">Analyse & Synthese</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Ergebnisse kommunizieren'}}">Ergebnisse kommunizieren</b-dropdown-item>
        <b-dropdown-item link :to="{name: 'Reflexion', params: { reflexionsPhase: 'Gruppe auflösen'}}">Gruppe auflösen</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import ReviewCircle from '@/components/ReviewCircle.vue'
export default {
  name: 'Home',
  components: {
    ReviewCircle
  },
  mounted() {
            this.$zircle.config({
                mode: 'mixed',
                style: {
                    theme: 'white'
                }
            })

            this.$zircle.setView('ReviewCircle')
        }
}
</script>
