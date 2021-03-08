<script>
    import { Pie } from "vue-chartjs";
    import { mapState } from 'vuex';

    export default {
      extends: Pie,

        computed: {
            // Save Data from store, to use in this class
            ...mapState({
                chartData: state => state.chartData,
            })
        },

        mounted() {

            // pie chart with colour gradient

            /*
            this.gradient = this.$refs.canvas
                .getContext("2d")
                .createLinearGradient(0, 0, 0, 450);


            this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
            this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
            this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

              */

            /*
             * generate the pie chart with attributes
             */
            this.renderChart(
                {
                // Name of each part of the pie chart 
                labels: this.chartData.chartData.labels, 

                datasets: [
                    {
                        // pie chart with colour gradient
                       /* 
                        backgroundColor: ["#0000FF", this.gradient, "#FF0000"],
                        */
                        // colors of each pillar of one pie row
                        backgroundColor: this.chartData.chartData.backgroundColor, 
                        // data of each pillar of one pie row 
                        data: this.chartData.chartData.data, 
                    }
                ]
                },
                { responsive: true, maintainAspectRatio: false }
            );
        }
    };
</script>