<template>
  <div class="container h-100 w-100 p-0 m-0 justify-content-center">
    <div class="spinner-grow spinner-grow spinner-setup" role="status">
    </div>  
    <h4 class="spinner-text text-center">درحال بارگذاری ....</h4>
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped>
.spinner-setup {
  height: 150px;
  width: 150px;
  display: block;
  position: fixed;
  top: 50%;
  right: 50%;
}
.spinner-text {
  display: block;
  position: fixed;
  top: 40%;
  right: 50%;
}
</style>