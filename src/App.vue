<template>
  <base-feature-layout
    :missionList="missionList"
    @addMissionEmit="addMissionEmitHandler"
    @executeMissionEmit="executeMissionEmitHandler"
  />
  <advanced-feature-layout />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
import BaseFeatureLayout from "./layouts/BaseFeatureLayout.vue";
import AdvancedFeatureLayout from "./layouts/AdvancedFeatureLayout.vue";

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
        },
      ],
    });

    function executeMissionEmitHandler(payload: number) {
      state.missionList = [
        ...state.missionList.splice(payload, 1),
        ...state.missionList,
      ];
    }

    function addMissionEmitHandler(payload: string) {
      state.missionList.push({
        complete: false,
        name: payload,
        unitTime: 1500,
        executeTime: 0,
      });
    }

    return {
      ...toRefs(state),
      executeMissionEmitHandler,
      addMissionEmitHandler,
    };
  },
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
