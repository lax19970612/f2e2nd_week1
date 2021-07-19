<template>
  <base-feature-layout />
  <advanced-feature-layout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import BaseFeatureLayout from './layouts/BaseFeatureLayout.vue';
import AdvancedFeatureLayout from './layouts/AdvancedFeatureLayuut.vue';

export default defineComponent({
  name: 'App',
  components: {
    // HelloWorld
    BaseFeatureLayout,
    AdvancedFeatureLayout
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: Roboto;
  src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
}

* {
  box-sizing: border-box;
  letter-spacing: 0;
}

html, body {
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
}
</style>
