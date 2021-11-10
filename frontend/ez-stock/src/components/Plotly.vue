<template>
  <keep-alive>
    <div class="main">
      <div id="plotChart" ref="graph"></div>
    </div>
  </keep-alive>
</template>

<script>
import Plotly from "plotly.js-dist";

export default {
  name: "Plotly",
  props: ["data", "layout", "chartId"],

  data() {
    return {
      plotChartId: null,
    };
  },

  mounted() {
    console.log(this.data.data)
    console.log(this.layout)
    Plotly.newPlot("plotChart", this.data, this.layout, {
      responsive: true,
      displaylogo: false,
      displayModeBar: true,
      scrollZoom: false,
    });
    this.plotChartId = this.chartId;
    // this.innerLayout = { ...this.$refs.graph.layout };
    // console.log(this.innerLayout);

    // this.printChart(this.charts[0].chart_id);
  },
  watch: {
    data: function (newVal) {
      // watch it
      var newLayout = this.layout;

      // if (this.plotChartId === this.chartId) {
      //   Plotly.animate("plotChart", {
      //     layout: {
      //       "xaxis.autorange": true,
      //       "yaxis.autorange": true,
      //     },
      //   });
      //   Plotly.animate("plotChart", {
      //     data: newVal,
      //     layout: newLayout,
      //   });
      // } else {
        this.plotChartId = this.chartId;
        Plotly.newPlot("plotChart", newVal, newLayout, {
          responsive: true,
          displaylogo: false,
          displayModeBar: true,
          scrollZoom: false,
        });
      // }
      // Plotly.newPlot("plotChart", newVal, newLayout, {
      //   responsive: true,
      //   displaylogo: false,
      //   displayModeBar: true,
      //   scrollZoom: false,
      // });
      // Plotly.animate("plotChart", {'data':newVal , 'layout' : newLayout});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#plotChart {
  width: 100%;
  height: 95%;
  padding: 35px 0;
  margin: 0;
}
</style>