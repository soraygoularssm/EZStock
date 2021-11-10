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
import {
  fetchData,
  loadClientType,
  loadInstStat,
  loadInstHistory,
  RenderData,
  UpdateMarketWatch,
} from "../worker-api";

export default {
  red: [
    "توسعه",
    "وکاسپی",
    "ونور",
    "چبسپا",
    "سپرمی",
    "کابگن",
    "معیار",
    "سخرم",
    "کاصفا",
    "بدکو",
    "کچینی",
    "بلوله",
    "فسدید",
    "تراک",
  ],
  orange: [
    "دحاوی",
    "کایتا",
    "سایرا",
    "ساذری",
    "آینده",
    "وآیند",
    "وشهر",
    "وسالت",
    "وگردش",
    "آرمان",
    "ورازی",
    "شصفها",
    "جهرم",
    "شستان",
    "دتهران",
    "شتولی",
    "تسم",
    "نازن",
    "ستوین",
    "شیمچا",
    "خبازرس",
    "رفاه",
    "فوکا",
    "فیستو",
    "قنقش",
    "چکارم",
    "بتک",
    "کصدف",
    "غیوان",
    "سفارود",
    "لازما",
    "کنیول",
    "شکف",
    "وسدید",
    "غناب",
    "لپیام",
    "تفیرو",
    "تپولا",
    "شساخت",
    "شلیا",
    "فامواز",
  ],
  yellow: [
    "وحصا",
    "خودکفا",
    "خاور",
    "فالوم",
    "سامان",
    "سمایه",
    "فیبرا",
    "انرژی",
    "وتعاون",
    "وحافظ",
    "وسرمد",
    "وسین",
    "وآفری",
    "ساروج",
    "بنو",
    "وحکمت",
    "بخاور",
    "شکبیر",
    "داراب",
    "شفارا",
    "فسا",
    "کازرو",
    "ممسنی",
    "شپترو",
    "نتوس",
    "تپلی",
    "تابا",
    "تجوان",
    "وکادو",
    "بمیلا",
    "تیکو",
    "پشاهن",
    "شمواد",
    "کهرام",
    "نجوش",
    "خفولا",
    "دقاضی",
    "شتهران",
    "حبندر",
    "حرهشا",
    "ثاصفا",
    "خکاره",
    "وآقر",
    "وارس",
    "آریان",
    "تزاگرس",
    "وجامی",
    "وتنو",
    "واپرا",
    "تنور",
    "وستا",
    "وتخوز",
    "وتوق",
    "واتوس",
    "ودانا",
    "ثتوسا",
    "وستا",
    "ونحوز",
    "وتوق",
    "واتوس",
    "ودنا",
    "وشمال",
    "ثنام",
    "ثعتما",
    "وپسا",
    "ومشان",
    "وبرق",
    "وملت",
    "فسلیر",
    "سباقر",
    "سکارون",
    "سخواف",
    "سمتاز",
    "وآرین",
    "سلار",
    "ثقزوی",
    "سفاسی",
    "کیسون",
    "ولانا",
    "غشوکو",
    "دشیری",
    "شرنگی",
    "کمینا",
    "کقزوی",
    "فبستم",
    "شجم",
    "دهدشت",
    "نشتاد",
    "فنفت",
    "زنجان",
    "وآداک",
    "خصدرا",
    "غصینو",
    "فشرین",
    "خفناور",
    "كفرآور",
    "قجام",
    "فافزا",
    "قاروم",
    "نشار",
    "پلاست",
    "بایکا",
    "آبین",
    "شلرد",
    "لکما",
    "غبهار",
    "حاریا",
    "خکرمان",
    "وهنر",
    "فلات",
    "فن آور",
    "فنرژی",
    "لخانه",
    "ولراز",
    "خلیبل",
    "سجام",
    "واحیا",
    "تکنار",
    "گکیش",
    "گپارس",
    "پارتا",
    "غپونه",
    "نیرو",
    "چنوپا",
    "ولتجار",
    "کورز",
  ],

  name: "Filters",
  components: {
    FiltersBar,
    Spinner,
  },
  data() {
    return {
      loaded: false,
      FiltersList: false,
      showingFiltersIndex: [0],
      UpdateSpeed: 7000,
      FiltersResult: false,
      categoriesList: [],
    };
  },
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
.signs {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: scroll;
}
.sign {
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
}
.sign:focus {
  outline: 0 !important;
  box-shadow: none;
}
.bgred {
  background-color: rgba(255, 0, 0, 0.548);
}
.bgorange {
  background-color: rgba(255, 123, 0, 0.705);
}
.bgyellow {
  background-color: rgba(255, 230, 0, 0.678);
}

.slider {
  -webkit-appearance: none;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #0035a8;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #0035a8;
  cursor: pointer;
}
</style>