<template>
  <base-feature-layout
    :missionList="missionList"
    @addMissionEmit="addMissionEmitHandler"
    @executeMissionEmit="executeMissionEmitHandler"
  />
  <transition name="timer-fade">
    <timer
      v-if="!advancedMode"
      :mission="missionList[0]"
      @timerCountingEmit="timerCountingEmitHandler"
    />
  </transition>
  <advanced-feature-layout
    :advancedMode="advancedMode"
    @changeModeEmit="changeModeEmitHandler"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
import BaseFeatureLayout from "./layouts/BaseFeatureLayout.vue";
import AdvancedFeatureLayout from "./layouts/AdvancedFeatureLayout.vue";
import Timer from "./components/Timer.vue";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld
    BaseFeatureLayout,
    AdvancedFeatureLayout,
    Timer,
  },
  setup() {
    const state = reactive({
      advancedMode: false,
      missionList: [
        {
          id: Math.floor(new Date().valueOf() * Math.random()),
          complete: false,
          name: "first mission",
          unitTime: 1500,
          executeTime: 3000,
        },
        {
          id: Math.floor(new Date().valueOf() * Math.random()),
          complete: false,
          name: "second mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          id: Math.floor(new Date().valueOf() * Math.random()),
          complete: false,
          name: "third mission",
          unitTime: 1500,
          executeTime: 0,
        },
        {
          id: Math.floor(new Date().valueOf() * Math.random()),
          complete: false,
          name: "forth mission",
          unitTime: 1500,
          executeTime: 0,
        },
      ],
    });

    function executeMissionEmitHandler(payload: number) {
      const executeMissionIndex = state.missionList.findIndex((mission) => {
        return mission.id === payload;
      });

      state.missionList = [
        ...state.missionList.splice(executeMissionIndex, 1),
        ...state.missionList,
      ];
    }

    function addMissionEmitHandler(payload: string) {
      state.missionList.push({
        id: Math.floor(new Date().valueOf() * Math.random()),
        complete: false,
        name: payload,
        unitTime: 1500,
        executeTime: 0,
      });
    }

    function timerCountingEmitHandler() {
      state.missionList[0].executeTime++;
    }

    function changeModeEmitHandler(flag: boolean) {
      state.advancedMode = flag;
    }

    return {
      ...toRefs(state),
      executeMissionEmitHandler,
      addMissionEmitHandler,
      timerCountingEmitHandler,
      changeModeEmitHandler
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

.timer-fade-enter-active, .timer-fade-leave-active {
  transition: opacity .3s;
}

.timer-fade-enter, .timer-fade-leave-to {
  opacity: 0;
}

</style>
