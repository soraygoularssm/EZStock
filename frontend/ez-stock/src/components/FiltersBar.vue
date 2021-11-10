<template>
  <div class="sidenav">
    <h1 class="text-center pb-2 text-light">فیلتر ها  </h1>
    <div class="text-center text-white h4 py-4">
      <input class="form-check-input" type="checkbox" value="" v-model="mixMode" v-on:click="selectedFilters = []; $emit('filters', -1);">
      <span class="mr-5">
        حالت ترکیب فیلتر ها
      </span>
    </div>
    <ul
      class="list-group px-0 py-1"
      v-on:click="slectCat(index)"
      v-bind:key="index"
      v-for="(category, index) in categories"
    >
      <li
        class="category list-group-item text-center"
        v-bind:class="{
          'border-top border-bottom border-light': slectedCat === index,
        }"
      >
        {{ category }}
      </li>
    </ul>
    <hr class="bg-white"/>
    <ul
      v-bind:key="filter.id"
      v-for="(filter, index) in filters"
      class="list-group p-0"
    >
      <li
        class="chart list-group-item"
        v-on:click="slectFilter(index)"
        v-bind:class="{ 'bg-white text-black': (selectedFilters[0] === index && mixMode === false) || (selectedFilters.includes(index) && mixMode === true)}"
        v-show="categories[slectedCat] === filter.category"
      >
      <span>
        {{ filter.name }}
      </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FiltersBar",
  // props: ["filters" , "categories"],
  props: ["filters" , "categories"],
  data: function () {
    return {
      mixMode: false,
      selectedFilters: [0],
      slectedCat: 0,
    };
  },
  methods: {
    slectCat: function (index) {
      this.slectedCat = index;
    },
    slectFilter: function (index) {
      if(this.mixMode === false) {
        this.selectedFilters[0] = index;
        this.$emit("filter", index);
      } else {
        if(this.selectedFilters.includes(index) === true) {
          this.selectedFilters.splice(this.selectedFilters.indexOf(index) , 1);
        } else {
          this.selectedFilters.push(index);
        }
        this.$emit("filters", index);
      }
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

.sidenav li {
  padding: 12px 30px;
  text-decoration: none;
  font-size: 18px;
  color: #959595;
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
}

.sidenav .category:hover {
  background: white;
  color: black !important;
}

.text-black {
  color: black !important;
}
</style>