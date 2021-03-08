<script>
    import { Bar } from "vue-chartjs";
    import { mapState } from 'vuex';

    export default {
        extends: Bar,

        // Save Data from store, to use in this class
         computed: {
            ...mapState({
                 chartData: state => state.chartData,
            })
        },
 
        mounted() {

         // Barchart with colour gradient

   /*
            this.gradient = this.$refs.canvas
              .getContext("2d")
              .createLinearGradient(0, 0, 0, 450);


          this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
          this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
          this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
 
 */

            // create bar chart 
            this.renderChart(
                {
                    // Labelnames 
                    labels: this.chartData.chartData.labels,
                    datasets: [
                        // {} -> corresponds to one bar row 
                        {

                            // bar chart with colour gradient
                            /* 
                            backgroundColor: ["#0000FF", this.gradient, "#FF0000"],
                            */
                            // colors of each pillar of one bar row
                            backgroundColor: this.chartData.chartData.backgroundColor,
                            // data of each pillar of one bar row 
                            data: this.chartData.chartData.data, 
                        }

              ]


              },

            // options  
              {
                  responsive: true,
                  maintainAspectRatio: false, 

                  scales: {
                      yAxes: [{
                          ticks: {
                              // start at zero 
                              beginAtZero: true
                          }
                      }]
                  }, 
                  legend: {
                      // does not show legend
                      display: false
                  }
              }
        );
      }
    };
</script>
