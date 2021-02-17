<script>
    import { Bar } from "vue-chartjs";
    import { mapState } from 'vuex';

    export default {
        extends: Bar,

        // Speicherung der Daten aus dem Store, um sie in dieser Klasse zu verwenden
         computed: {
            ...mapState({
                 chartData: state => state.chartData,
            })
        },
 
        mounted() {

         // Stabdiagramm mit Farbverlauf 

   /*
            this.gradient = this.$refs.canvas
              .getContext("2d")
              .createLinearGradient(0, 0, 0, 450);


          this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
          this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
          this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");
 
 */
            this.renderChart(
                {
                    labels: this.chartData.chartData.labels,
                    datasets: [
                        // Eine {}Klammer entspricht einer Stabreihe
                        {
                            // Name der Daten des Stabdiagramms
                            label: ["Data"],
                            // Farben der einzelnen Säulen einer Stabreihe 
                            backgroundColor: this.chartData.chartData.backgroundColor,
                            // Daten der einzelnen Säulen einer Stabreihe 
                            data: this.chartData.chartData.data, 
                        }

              ]


              },


              {
                  responsive: true,
                  maintainAspectRatio: false, 
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }, 
                  legend: {
                      display: false
                  }
              }
        );
      }
    };
</script>
