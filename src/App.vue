<template>
  <base-feature-layout
    :missionList="missionList"
    @addMissionEmit="addMissionEmitHandler"
    @executeMissionEmit="executeMissionEmitHandler"
  />
  <transition name="timer-fade">
    <timer
      v-show="!advancedMode"
      :mission="missionList[0]"
      @timerCountingEmit="timerCountingEmitHandler"
    />
  </transition>
  <advanced-feature-layout
    :advancedMode="advancedMode"
    :missionList="missionList"
    :ringtonesSetting="ringtonesSetting"
    @addMissionEmit="addMissionEmitHandler"
    @executeMissionEmit="executeMissionEmitHandler"
    @changeModeEmit="changeModeEmitHandler"
    @ringtoneSettingChangeEmit="ringtoneSettingChangeEmitHandler"
  />
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
// import HelloWorld from './components/HelloWorld.vue';
import BaseFeatureLayout from "./layouts/BaseFeatureLayout.vue";
import AdvancedFeatureLayout from "./layouts/AdvancedFeatureLayout.vue";
import Timer from "./components/Timer.vue";

import tempMissionData from "@/assets/tempMissionData";
import tempRingtoneList from "@/assets/tempRingtoneList";

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
      missionList: tempMissionData,
      ringtonesSetting: {
        work: tempRingtoneList[0] || null,
        break: tempRingtoneList[0] || null,
        list: tempRingtoneList,
      },
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

    function ringtoneSettingChangeEmitHandler(payload: {
      type: string;
      value: string;
    }) {
      switch (payload.type) {
        case "work":
          state.ringtonesSetting.work = payload.value;
          break;
        case "break":
          state.ringtonesSetting.break = payload.value;
          break;
      }
    }

    return {
      ...toRefs(state),
      executeMissionEmitHandler,
      addMissionEmitHandler,
      timerCountingEmitHandler,
      changeModeEmitHandler,
      ringtoneSettingChangeEmitHandler,
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita%E2%80%8C%E2%80%8Blic,400italic,500,500italic,700,700italic,900italic,900");

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

.timer-fade-enter-active,
.timer-fade-leave-active {
  transition: opacity 0.3s;
}

.timer-fade-enter,
.timer-fade-leave-to {
  opacity: 0;
}
</style>
