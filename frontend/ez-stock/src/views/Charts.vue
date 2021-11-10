<template>
  <div class="home">
    <ChartsWrapper/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartsWrapper from '@/components/ChartsWrapper.vue'

export default {
  name: 'Charts',
  components: {
    ChartsWrapper
  }
}
</script>
