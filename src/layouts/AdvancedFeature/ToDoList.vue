<template>
  <div class="todolist-wrapper">
    <mission-input @addMissionEmit="addMissionEmitHandler" />
    <header-bar title="to-do" />
    <mission-list
      :missionList="missionList"
      :options="{
        showComplete: false,
        limit: -1,
        showFirstMission: true,
        inAdvancedMode: true,
      }"
      @executeMissionEmit="executeMissionEmitHandler"
    />
    <header-bar title="done" />
    <mission-list
      :missionList="missionList"
      :options="{
        showComplete: true,
        limit: -1,
        showFirstMission: true,
        inAdvancedMode: true,
      }"
      @executeMissionEmit="null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import MissionInput from "@/components/MissionInput.vue";
import MissionList from "@/components/MissionList.vue";
import HeaderBar from "@/components/AdvancedFeature/HeaderBar.vue";

import Mission from "@/interfaces/Mission";

export default defineComponent({
  name: "ToDoList",
  components: {
    MissionInput,
    HeaderBar,
    MissionList,
  },
  props: {
    missionList: {
      type: Array as PropType<Mission[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // @method: emit handler
    function addMissionEmitHandler(payload: string) {
      emit("addMissionEmit", payload);
    }

    function executeMissionEmitHandler(payload: number) {
      emit("executeMissionEmit", payload);
    }

    return {
      addMissionEmitHandler,
      executeMissionEmitHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
.todolist-wrapper {
  width: 100%;
  height: 100%;
  padding: 30px 0 30px 100px;
}
</style>
