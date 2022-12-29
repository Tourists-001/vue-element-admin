<template>
  <div class="app-container">
    <div style="margin: 0 0 5px 20px">Fixed header, sorted by header order,</div>
    <FixedThead />
    <div style="margin: 0 0 5px 20px">Unfixed header, sorted by header order,</div>
    <unfixedThead />
  </div>
</template>

<script>
import FixedThead from './components/fixedThead.vue'
import unfixedThead from './components/unfixedThead.vue'
export default {
  components: {
    FixedThead,
    unfixedThead
  }
}
</script>

<style></style>
