<template>
  <div class="sidenav">
    <!-- {{charts}} -->
    <h1 class="text-center pb-2 text-light">نمودارها</h1>
    <div
      v-on:click="slectCat(index)"
      v-bind:key="category.id"
      v-for="(category, index) in categories"
    >
      <a
        class="category text-center"
        v-bind:class="{
          'border-top border-bottom border-light': slectedCat === index,
        }"
      >
        {{ categoryDict[category-1] }}
      </a>
    </div>
    <br />
    <ul
      v-bind:key="chart.id"
      v-for="(chart, index) in charts"
      class="list-group p-0"
    >
      <li
        class="chart list-group-item"
        v-on:click="slectChart(index)"
        v-bind:class="{
          'bg-white text-black': charts[slectedChart].id === chart.id,
        }"
        v-show="categories[slectedCat] === chart.category"
      >
        {{ chart.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChartsBar",
  props: ["categories", "charts"],
  data: function () {
    return {
      slectedCat: 0,
      slectedChart: 0,
      categoryDict: ["دیدبان", "بنیادی", "تکنیکال"],
    };
  },
  methods: {
    slectCat: function (index) {
      this.slectedCat = index;
      this.$emit("category", index);
    },
    slectChart: function (index) {
      this.slectedChart = index;
      this.$emit("chart", index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidenav {
  background-color: black;
  cursor: default;

  overflow-y: hidden;
  overflow-x: hidden;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.sidenav a {
  padding: 12px 30px;
  text-decoration: none;
  font-size: 18px;
  color: #818181;
  display: block;
}

.sidenav .chart {
  text-align: right;
  background: black;
}

.sidenav .chart:hover {
  color: #f1f1f1;
}

.sidenav .category {
  color: white !important;
  background: black;
  margin: 0 auto;
}

.sidenav .category:hover {
  background: white;
  color: black !important;
}

.text-black {
  color: black !important;
}
</style>