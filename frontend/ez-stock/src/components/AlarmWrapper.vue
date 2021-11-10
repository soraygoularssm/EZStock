<template>
  <div class="container-fluid p-0 h-100">
    <div class="d-flex flex-column h-100">
      <div class="row m-0 p-0 flex-grow-1" dir="rtl">
        <keep-alive>
          <FiltersBar
            class="col-2"
            v-bind:filters="FiltersList"
            v-bind:categories="categoriesList"
            v-on:filter="showFilter"
            v-on:filters="combineFilters"
          />
        </keep-alive>
        <div class="signs col-10">
          <div class="px-2 py-5 mt-5" v-if="loaded != false">
            <div class="py-4 row">
              <h5 class="col-3 text-center">بروز رسانی به ثانیه</h5>
              <input
                type="range"
                min="1000"
                max="60000"
                step="1000"
                v-model="UpdateSpeed"
                class="slider col-8 p-0"
                dir="rtl"
              />
              <h5 class="col-1 text-center">
                {{ UpdateSpeed / 1000 }}
              </h5>
            </div>
            <hr />
            <div class="pt-3 d-flex flex-wrap">
              <a
                v-bind:href="
                  'http://www.tsetmc.com/loader.aspx?ParTree=151311&i=' +
                  filter[2]
                "
                target="_blank"
                class="sign flex-fill px-0 py-3 m-2 text-center btn"
                :class="[
                  'col-' + filter[1],
                  {
                    bgred: $options.red.includes(filter[0]),
                    bgorange: $options.orange.includes(filter[0]),
                    bgyellow: $options.yellow.includes(filter[0]),
                  },
                ]"
                v-bind:key="index"
                v-for="(filter, index) in FiltersResult"
              >
                <h3>
                  {{ filter[0] }}
                </h3>
              </a>
            </div>
          </div>
          <Spinner v-if="FiltersResult == false && loaded == false" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FiltersBar from "@/components/FiltersBar";
import Spinner from "@/components/Spinner";
import {hasShakhesChanged} from "../worker-api";

export default {
  name: "AlarmWrapper",
  methods: {
    async combineFilters(filterIndex) {
      if (filterIndex === -1) {
        this.showingFiltersIndex = [];
      } else {
        if (this.showingFiltersIndex.includes(filterIndex) === true) {
          this.showingFiltersIndex.splice(
            this.showingFiltersIndex.indexOf(filterIndex),
            1
          );
        } else {
          this.showingFiltersIndex.push(filterIndex);
        }
        this.FiltersResult = await RenderData(
          JSON.parse(JSON.stringify(this.showingFiltersIndex))
        );
      }
    },
    async showFilter(filterIndex) {
      this.showingFiltersIndex[0] = filterIndex;
      this.FiltersResult = await RenderData(
        JSON.parse(JSON.stringify(this.showingFiltersIndex))
      );
    },
    loopFilters(filter) {
      if (!this.categoriesList.includes(filter.category)) {
        this.categoriesList.push(filter.category);
      }
    },
    loadCategories() {
      if (this.FiltersList != false) {
        this.FiltersList.forEach(this.loopFilters);
      }
      console.log(this.categoriesList)
    },
  },
  async created() {
    this.FiltersList = await fetchData();
    this.loadCategories();

    await loadClientType();
    await loadInstStat();
    await loadInstHistory();

    const self = this;
    async function timer() {
      window.setTimeout(timer, parseInt(self.UpdateSpeed));
      self.FiltersResult = await UpdateMarketWatch(
        JSON.parse(JSON.stringify(self.FiltersList)),
        JSON.parse(JSON.stringify(self.showingFiltersIndex))
      );
    }
    timer();

    this.loaded = true;
  },
};
</script>

<style>
</style>