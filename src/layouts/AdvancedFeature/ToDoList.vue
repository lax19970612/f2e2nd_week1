<template>
  <div class="todolist-wrapper">
    <mission-input @addMissionEmit="addMissionEmitHandler" />
    <div class="section-wrapper">
      <header-bar title="to-do" />
      <mission-list
        class="mission-list-wrapper"
        :missionList="missionList"
        :options="{
          showComplete: false,
          limit: -1,
          showFirstMission: true,
          inAdvancedMode: true,
        }"
        @executeMissionEmit="executeMissionEmitHandler"
      />
    </div>
    <div class="section-wrapper">
      <header-bar title="done" />
      <mission-list
        class="mission-list-wrapper"
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
  padding-left: 100px;
}

.section-wrapper {
  margin-top: 54px;
}

.mission-list-wrapper {
  max-height: 150px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
