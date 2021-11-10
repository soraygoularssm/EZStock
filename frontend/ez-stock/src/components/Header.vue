<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="mr-3">
        <a class="navbar-brand" href="#">
          <img
            :src="publicPath + 'ez-stock-white.png'"
            alt="Logo"
            style="width: 40px"
          />
        </a>
        <a class="navbar-brand" href="#">
          {{ title }}
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">نمودارها</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/filters">فیلترها</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: ["title", "publicPath"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-black {
  z-index: 999;
  background-color: black !important;
}
</style>