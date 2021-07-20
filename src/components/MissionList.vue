<template>
  <div class="mission-list-wrapper">
    <div
      class="mission-list-row"
      v-for="(mission, index) in sortedMissionList"
      :key="index"
    >
      <div
        class="mission-list-icon"
        :class="[mission.complete ? 'icon-checked' : 'icon-unchecked']"
      />
      <div class="mission-list-content">{{ mission.name }}</div>
      <div
        v-if="!mission.complete"
        class="mission-list-play-icon"
        @click="executeMission(index)"
      />
    </div>
    <div class="mission-list-row mission-list-getmore">MORE</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from "vue";
import Mission from "@/interfaces/Mission";

export default defineComponent({
  name: "MissionList",
  props: {
    missionList: {
      type: Array as PropType<Mission[]>,
      default: () => [],
    },
    showComplete: {
      type: Boolean,
      default: false,
    },
    showFirstMission: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      sortedMissionList: sortedMission(props.missionList),
    });

    // @watch
    watch(
      () => props.missionList,
      (newValue: Mission[]) => {
        state.sortedMissionList = sortedMission(newValue);
      },
      { deep: true }
    );

    // @method
    function sortedMission(initialMissionList: Mission[]): Mission[] {
      const missions: Mission[] = props.showFirstMission
        ? initialMissionList
        : initialMissionList.slice(1);
      const filterMissions: Mission[] = missions.filter((mission: Mission) => {
        return mission.complete === props.showComplete;
      });

      const sortedMissionList: Mission[] =
        props.limit !== -1
          ? filterMissions.slice(0, props.limit)
          : filterMissions;

      return sortedMissionList;
    }

    function executeMission(index: number) {
      emit("executeMissionEmit", !props.showFirstMission ? index + 1 : index);
    }

    return {
      ...toRefs(state),
      sortedMission,
      executeMission,
    };
  },
});
</script>

<style lang="scss" scoped>
$mission_list_icon_size: 22px;
$mission_list_font_color: #003164;

.mission-list {
  &-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
  }

  &-row {
    width: 100%;
    display: flex;
    padding: 10px 0;
    border-bottom: 2px solid rgba(200, 200, 200, 0.7);
  }

  &-icon {
    min-width: $mission_list_icon_size;
    width: $mission_list_icon_size;
    min-height: $mission_list_icon_size;
    height: $mission_list_icon_size;

    background-color: $mission_list_font_color;
  }

  &-content {
    width: calc(100% - #{$mission_list_icon_size} * 2);
    text-transform: uppercase;
    font-weight: bold;
    color: $mission_list_font_color;
    padding: 0 5px;

    margin-top: -2px;
  }

  &-play-icon {
    min-width: $mission_list_icon_size;
    width: $mission_list_icon_size;
    min-height: $mission_list_icon_size;
    height: $mission_list_icon_size;

    cursor: pointer;

    background-color: $mission_list_font_color;
    mask: url("~@/assets/svg/play_circle_outline_24dp.svg") no-repeat center /
      contain;
    -webkit-mask: url("~@/assets/svg/play_circle_outline_24dp.svg") no-repeat
      center / contain;
  }

  &-getmore {
    border-bottom: 0;
    color: #00a7ff;
    justify-content: flex-end;
    font-weight: bold;
    cursor: pointer;
  }
}

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
