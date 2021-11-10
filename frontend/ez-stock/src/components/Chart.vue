<template>
  <keep-alive>
    <div class="main">
      <div class="lastUpdate">آخرین آپدیت: {{ chart.last_update }}</div>
      <Plotly :chartId="chart.chart_id" :data="chart.data" :layout="chart.data.layout" />
    </div>
  </keep-alive>
</template>

<script>
import Plotly from "./Plotly";

export default {
  name: "Chart",
  props: ["chart"],
  components: {
    Plotly,
  },

  // methods: {
  //   printChart(chartId) {
  //     this.chartId = chartId;
  //     var showingChart = this.charts.filter(
  //       (chart) => chart.chart_id == chartId
  //     )[0];
  //     Plotly.newPlot(
  //       "plotChart",
  //       showingChart.data.data,
  //       showingChart.data.layout
  //     );
  //   },
  //   updateChart() {
  //     if (this.chartId) {
  //       // this.printChart(this.chartId)
  //       var chartId = this.chartId;
  //       var showingChart = this.charts.filter(
  //         (chart) => chart.chart_id == chartId
  //       )[0];
  //       Plotly.react("plotChart", showingChart.data.data, showingChart.data.layout)
  //     } else {
  //       console.log("no chart selected yet");
  //     }
  //   },
  // },

  // mounted() {
  //   var showingChart = this.charts.filter(
  //     (chart) => chart.chart_id == this.charts[0].chart_id
  //   )[0];
  //   this.showingChart = showingChart
  //   // this.printChart(this.charts[0].chart_id);
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  padding: 0 15px;
  font-size: 16px;
  height: 90vh;
  width: 100%;
}
.lastUpdate {
  height: 25px;
  text-align: right;
  font-size: 20px;
  padding: 10px;
  
}
</style>