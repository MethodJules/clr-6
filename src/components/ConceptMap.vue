<template>
<div>
    <svg >
        <defs>
            <marker id="m-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
                <path d="M0,0 L0,6 L9,3 z"></path>
            </marker>

        </defs>
    </svg>
  <d3-network :net-nodes="nodes" :net-links="links" :options="options" :link-cb="lcb"></d3-network>
</div>
</template>

<script>
import D3Network from 'vue-d3-network';
import { mapState } from 'vuex';
export default {
    components: {
        D3Network,
    },
    data: function() {
        return {
            options: {
                    force: 3000,
                    nodeSize: 30,
                    nodeLabels: true,
                    linkWidth: 2,
                },
        }
    },
    methods: {
        lcb(link) {
            link._svgAttrs = {'marker-end': 'url(#m-end)'}
            return link
        },
        saveToDatabase() {
            console.log(this.nodes)
            console.log(this.links)
            //this.$store.dispatch('saveConceptMapToDB')
        }
    },
    computed: {
        ...mapState({
            nodes: state => state.concept_map.nodes,
            links: state => state.concept_map.links
        })
    }
}
</script>

<style>
#m-end path, #m-start{
  fill: rgba(18, 120, 98, 0.8);
}

</style>