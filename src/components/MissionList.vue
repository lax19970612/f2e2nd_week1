<template>
  <div class="mission-list-wrapper">
    <div
      class="mission-list-row"
      v-for="mission in sortedMissionList"
      :key="mission.id"
    >
      <div
        class="mission-list-icon"
        :class="[
          { 'advanced-mode-bg-color': options.inAdvancedMode },
          mission.complete ? 'icon-checked' : 'icon-unchecked',
        ]"
      />
      <div
        class="mission-list-content"
        :class="{
          'advanced-mode-color': options.inAdvancedMode,
          'is-complete': mission.complete,
        }"
      >
        {{ mission.name }}
        <div class="timelength-wrapper" v-if="mission.complete">
          <div
            v-for="index in calcUnit(mission.executeTime, mission.unitTime)"
            :key="index"
            class="timelength-showing-circle"
          />
        </div>
      </div>
      <div
        v-if="!mission.complete"
        class="mission-list-play-icon"
        :class="{ 'advanced-mode-bg-color': options.inAdvancedMode }"
        @click="executeMission(mission.id)"
      />
    </div>
    <div
      v-if="options.limit !== -1"
      class="mission-list-row mission-list-getmore"
    >
      MORE
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from "vue";
import Mission from "@/interfaces/Mission";
import MissionListOption from "@/interfaces/MissionListOption";

export default defineComponent({
  name: "MissionList",
  props: {
    missionList: {
      type: Array as PropType<Mission[]>,
      default: () => [],
    },
    options: {
      type: Object as PropType<MissionListOption>,
      default: () => {
        return {
          showComplete: false,
          showFirstMission: false,
          limit: -1,
          inAdvancedMode: false,
        };
      },
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
      const missions: Mission[] = props.options.showFirstMission
        ? initialMissionList
        : initialMissionList.slice(1);
      const filterMissions: Mission[] = missions.filter((mission: Mission) => {
        return mission.complete === props.options.showComplete;
      });

      const sortedMissionList: Mission[] =
        props.options.limit !== -1
          ? filterMissions.slice(0, props.options.limit)
          : filterMissions;

      return sortedMissionList;
    }

    function calcUnit(executeTime: number, unitTime: number): number {
      return Math.floor(executeTime / unitTime);
    }

    function executeMission(id: number) {
      emit("executeMissionEmit", id);
    }

    return {
      ...toRefs(state),
      calcUnit,
      executeMission,
    };
  },
});
</script>

<style lang="scss" scoped>
$mission_list_icon_size: 22px;
$mission_list_font_color: #003164;
$mission_list_advanced_mode_font_color: #fff;

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

.timelength-wrapper {
  padding: 2px 0;
  display: inline-block;
  width: 100%;
}

.timelength-showing-circle {
  margin: 0 2.5px;
  background-color: $mission_list_advanced_mode_font_color;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.is-complete {
  text-decoration: line-through;
}

.advanced-mode-bg-color {
  background-color: $mission_list_advanced_mode_font_color;
}

.advanced-mode-color {
  color: $mission_list_advanced_mode_font_color;
}
</style>
