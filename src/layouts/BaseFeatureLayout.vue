<template>
  <section class="base-feature-layout">
    <mission-input @addMissionEmit="addMissionEmitHandler" />
    <current-mission :mission="missionList[0]" />
    <mission-list
      :missionList="missionList"
      :limit="3"
      @executeMissionEmit="executeMissionEmitHandler"
    />
  </section>
</template>

<script lang="ts">
import Mission from "@/interfaces/Mission";

import MissionInput from "@/components/MissionInput.vue";
import CurrentMission from "@/components/BaseFeature/CurrentMission.vue";
import MissionList from "@/components/MissionList.vue";

import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseFeatureLayout",
  props: {
    missionList: {
      type: Array as PropType<Mission[]>,
      default() {
        return [];
      },
    },
  },
  components: {
    MissionInput,
    CurrentMission,
    MissionList,
  },
  setup(props, { emit }) {
    function executeMissionEmitHandler(payload: number) {
      emit("executeMissionEmit", payload);
    }

    function addMissionEmitHandler(payload: string) {
      emit("addMissionEmit", payload);
    }

    return { executeMissionEmitHandler, addMissionEmitHandler };
  },
});
</script>

<style lang="scss" scoped>
$mission_list_icon_size: 22px;
$mission_list_font_color: #003164;

.base-feature-layout {
  width: 66.67%;
  min-height: 100vh;

  background-color: #e5f3ff;
  padding: 50px 27.3% 50px 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

<style lang="scss">
.icon-unchecked {
  mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat
    center / contain;
}

.icon-checked {
  mask: url("~@/assets/svg/check_circle_outline_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/check_circle_outline_24dp.svg") no-repeat
    center / contain;
}
</style>
