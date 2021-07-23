<template>
  <div class="playing-panel">
    <div class="timer-controller-wrapper relative">
      <div class="timer-controller-outer" @click="toggleTimer">
        <div class="timer-controller-inner">
          <div :class="[timerStart ? 'button-pause': 'button-start']" />
        </div>
      </div>
    </div>
    <div class="timer-content-wrapper relative">
      <div class="timer-content-remain-time">{{ remainTime }}</div>
      <div class="timer-content-mission">{{ mission.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Mission from "@/interfaces/Mission"

export default defineComponent({
  name: "PlayingPanel",
  props: {
    timerStart: {
      type: Boolean,
      default: false,
    },
    mission: {
      type: Object as PropType<Mission>,
      default: () => {
        return {};
      },
    },
  },

  setup(props, {emit}) {
    // @computed
    const remainTime = computed(() => {
      const time =
        props.mission.unitTime -
        (props.mission.executeTime % props.mission.unitTime);
      return `${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
    });

    function toggleTimer() {
      emit("toggleTimerEmit");
    }

    return {
      remainTime,
      toggleTimer
    }
  },
})
</script>


<style lang="scss" scoped>
$button_size: 36px;

.playing-panel {
  position: absolute;
  bottom: 0;
  left: 40px;
  transform: translate(0, 50%);

  width: 350px;
  height: 350px;
}

.timer-controller {
  &-inner,
  &-outer {
    background-color: #ff4384;
    border: 7px solid #003164;
    border-radius: 50%;
    padding: 2px;
  }

  &-outer {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    cursor: pointer;

    transition: 0.3s ease;
    &:hover {
      background-color: #fff;
    }
  }

  &-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .button-pause {
      width: 0;
      height: $button_size;
      border-style: double;
      border-width: 0 0 0 36px;
      border-color: #fff;
      margin-left: 0;

      transition: all 0.3s ease;
    }

    .button-start {
      width: 0;
      height: $button_size;
      margin-left: $button_size/4;
      border-style: solid;
      border-width: $button_size/2 0 $button_size/2 $button_size;
      border-color: transparent transparent transparent #fff;
      transition: all 0.3s ease;
    }
  }
}

.timer-content {
  &-wrapper {
    height: 350px;
    background-color: #ffedf7;
    border-radius: 50%;
    z-index: -1;

    display: flex;
    flex-direction: column;
    padding-top: 50px;
  }

  &-remain-time {
    color: #ff4384;
    font-size: 64px;
    font-weight: bold;
    text-align: center;
  }
  &-mission {
    color: #003164;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-top: -15px;
  }
}
</style>
