<script>
    import { Pie } from "vue-chartjs";
    import { mapState } from 'vuex';

    export default {
      extends: Pie,

        computed: {
            // Speicherung der Daten aus dem Store, um sie in dieser Klasse zu verwenden
            ...mapState({
                chartData: state => state.chartData,
            })
        },

        mounted() {

            // Kreisdiagramm mit Farbverlauf 

            /*
            this.gradient = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);


            this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
            this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
            this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

              */

            // Generiert das Diagramm mit ihren Eigenschaften
            // Jeweils in einem Array angelegt für jedes einzelene Element
            this.renderChart(
                {
                // Namen der einzelnen Teile des Kreidiagramms
                labels: this.chartData.chartData.labels, 

                datasets: [
                    {
                        // Kreisdiagramm mit Farbverlauf 
                       /* 
                        backgroundColor: ["#0000FF", this.gradient, "#FF0000"],
                        */
                        // Farben der einzelnen Teile des Kreisdiagramms 
                        backgroundColor: this.chartData.chartData.backgroundColor, 
                        // Daten / Zahlen der einzelnen Teile des Kreisdiagramms
                        data: this.chartData.chartData.data, 
                    }
                ]
                },
                { responsive: true, maintainAspectRatio: false }
            );
        }
    };
</script>