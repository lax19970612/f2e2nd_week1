<template>
  <div class="current-mission-wrapper">
    <div
      class="current-mission-icon"
      :class="[mission.complete ? 'icon-checked' : 'icon-unchecked']"
    />
    <div class="current-mission-content">
      <div class="current-mission-content-title">
        {{ mission.name }}
      </div>
      <div class="current-mission-content-timelength">
        <div
          v-for="index in unit"
          :key="index"
          class="timelength-showing-circle"
        />
      </div>
    </div>
    <div class="current-mission-countdown-timer">{{ remainTime }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import Mission from "@/interfaces/Mission";

export default defineComponent({
  props: {
    mission: {
      type: Object as PropType<Mission>,
      required: true,
    },
  },
  setup(props) {
    // @computed
    const unit = computed(() => {
      return Math.floor(props.mission.executeTime / props.mission.unitTime);
    });

    const remainTime = computed(() => {
      const time =
        props.mission.unitTime -
        (props.mission.executeTime % props.mission.unitTime);
      return `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
    });

    return {
      unit,
      remainTime,
    };
  },
});
</script>

<style lang="scss" scoped>
$current_mission_font_color: #003164;
$current_mission_icon_size: 48px;

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
</style>
