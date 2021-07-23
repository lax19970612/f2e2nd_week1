<template>
  <div class="custom-header-bar">
    <span>{{ title }}</span>
    <span class="custom-header-subtitle">{{ subtitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderBar",
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-header-bar {
  width: 100%;
  height: 44px;
  padding: 0 16px;
  background-color: #ffffff33;
  color: #fff;

  font-size: 24px;
  line-height: 44px;
  text-transform: uppercase;
  font-weight: bold;
}

.custom-header-subtitle {
  float: right;
  font-size: 16px;
}
</style>
