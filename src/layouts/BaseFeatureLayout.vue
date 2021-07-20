<template>
  <section class="base-feature-layout">
    <mission-input />
    <div class="current-mission-wrapper">
      <div class="current-mission-icon" />
      <div class="current-mission-content">
        <div class="current-mission-content-title">
          The first thing to do today
        </div>
        <div class="current-mission-content-timelength">
          <div class="timelength-showing-circle" />
          <div class="timelength-showing-circle" />
          <div class="timelength-showing-circle" />
          <div class="timelength-showing-circle" />
          <div class="timelength-showing-circle" />
        </div>
      </div>
      <div class="current-mission-countdown-timer">02:18</div>
    </div>
    <mission-list />
  </section>
</template>

<script lang="ts">
import Mission from "@/interfaces/Mission";

import MissionInput from "@/components/MissionInput.vue";
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
    MissionList,
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
$mission_list_icon_size: 22px;
$mission_list_font_color: #003164;

$current_mission_font_color: #003164;
$current_mission_icon_size: 48px;

.base-feature-layout {
  width: 66.67%;
  min-height: 100vh;

  background-color: #e5f3ff;
  padding: 50px 27.3% 50px 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.current-mission {
  &-wrapper {
    width: 100%;
    color: $current_mission_font_color;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &-icon {
    min-width: $current_mission_icon_size;
    width: $current_mission_icon_size;
    min-height: $current_mission_icon_size;
    height: $current_mission_icon_size;

    background-color: $current_mission_font_color;
    mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat center /
      contain;
    -webkit-mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat
      center / contain;
  }

  &-content {
    width: calc(100% - #{$current_mission_icon_size});
    padding-left: 16px;
    display: flex;
    flex-direction: column;
    margin-top: -6px;

    &-title {
      font-size: 24px;
      font-weight: bold;
      text-transform: uppercase;
    }

    &-timelength {
      padding: 2px 0;
      display: inline-block;

      .timelength-showing-circle {
        margin: 0 2.5px;
        background-color: $current_mission_font_color;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
      }

      .timelength-showing-circle:nth-of-type(1) {
        margin-left: 0;
      }
    }
  }

  &-countdown-timer {
    width: 100%;
    font-size: 176px;
    color: #00a7ff;
    font-weight: bold;
    margin-top: -40px;
  }
}

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
    mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat center /
      contain;
    -webkit-mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat
      center / contain;
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
</style>
