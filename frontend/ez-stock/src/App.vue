<template>
  <div class="vh-100">
    <Header v-bind:title="headerTitle" v-bind:publicPath="publicPath" />
    <router-view class="h-100" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      headerTitle: "EZ Stock",
    };
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  overflow: hidden;
}
</style>
