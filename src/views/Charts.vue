 <template>
    <div class="home">
        
        <!-- Switch between different Charts-->
        <b-form-select v-model="showPieChart" :options="options"></b-form-select>
        
        <div v-if="showPieChart">
            <!-- Kreisdiagramm / Piechart-->
            <PieChart />
        </div>

        <div v-else>
            <!-- Stabdiagramm / BarChart-->
            <BarChart />

        </div>


    </div>
</template>

<script>
    //import Chart-Components to use them in Template
    import PieChart from "@/components/PieChart.vue";
    import BarChart from "@/components/BarChart.vue";

    export default {
        name: "App",
        components: {
            PieChart,
            BarChart
        },
        data() {
            return {

                // Boolean to switch between Piechart and Barchart
                showPieChart: true, 

                // Options for select-Element
                options: [
                    { value: true, text: "Kreisdiagramm" }, 
                    { value: false, text: "Stabdiagramm" }
                ]
            };
        }
    };
</script>
