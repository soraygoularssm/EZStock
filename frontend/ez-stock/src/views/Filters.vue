<template>
  <div class="home">
    <FiltersComponnent>
    </FiltersComponnent>
  </div>
</template>

<script>
// @ is an alias to /src
import FiltersComponnent from '@/components/FiltersWrapper.vue'

export default {
  name: 'Filters',
  components: {
    FiltersComponnent
  }
}
</script>
