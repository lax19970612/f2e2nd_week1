<template>
  <base-feature-layout
    :missionList="missionList"
    @executeMissionEmit="executeMissionEmitHandler"
  />
  <advanced-feature-layout />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
import BaseFeatureLayout from "./layouts/BaseFeatureLayout.vue";
import AdvancedFeatureLayout from "./layouts/AdvancedFeatureLayout.vue";
import Mission from "./interfaces/Mission";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld
    BaseFeatureLayout,
    AdvancedFeatureLayout,
  },
  setup() {
    const state = reactive({
      missionList: [
        {
          complete: false,
          name: "first mission",
          unitTime: 1500,
          executeTime: 3000,
        },
        {
          complete: false,
          name: "second mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          complete: false,
          name: "third mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          complete: false,
          name: "forth mission",
          unitTime: 1500,
          executeTime: 0,
        }
      ]
    })

    function executeMissionEmitHandler(context: number) {
      state.missionList = [...state.missionList.splice(context, 1), ...state.missionList]
    }

    return { ...toRefs(state), executeMissionEmitHandler }
  }
});
</script>

<style lang="scss">
@font-face {
  font-family: Roboto;
  src: url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
}

* {
  box-sizing: border-box;
  letter-spacing: 0;
}

html,
body {
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
