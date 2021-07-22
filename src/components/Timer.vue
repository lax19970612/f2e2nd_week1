<template>
  <div class="countdown-timer-controller">
    <div class="countdown-timer-sector" :style="sectorClipPath" />
    <div
      class="countdown-timer-icon"
      :style="[
        isCounting
          ? { 'background-color': '#fff' }
          : { 'background-color': '#00a7ff' },
      ]"
    >
      <div
        class="countdown-timer-controller-icon-wrapper"
        :class="[isCounting ? 'button-pause-wrapper' : 'button-start-wrapper']"
        @click="triggerCounting"
      >
        <div :class="[isCounting ? 'button-pause' : 'button-start']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, PropType } from "vue";
import Mission from "@/interfaces/Mission";

export default defineComponent({
  name: "Timer",
  props: {
    mission: {
      type: Object as PropType<Mission>,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      isCounting: false,
      countInterval: undefined as undefined | number,
    });

    // @computed
    const sectorClipPath = computed(() => {
      const executeTime = props.mission.executeTime % props.mission.unitTime;
      const executeTimePercent = (executeTime / props.mission.unitTime) * 100;

      if (executeTimePercent <= 25) {
        return `clip-path: polygon(50% 50%, 0% 0%, ${
          executeTimePercent * 4
        }% 0%)`;
      } else if (executeTimePercent <= 50) {
        return `clip-path: polygon(50% 50%, 0% 0%, 100% 0%, 100% ${
          (executeTimePercent - 25) * 4
        }%)`;
      } else if (executeTimePercent <= 75) {
        return `clip-path: polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, ${
          100 - (executeTimePercent - 50) * 4
        }% 100%)`;
      } else {
        return `clip-path: polygon(50% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${
          100 - (executeTimePercent - 75) * 4
        }%)`;
      }
    });

    function triggerCounting() {
      state.isCounting = !state.isCounting;

      state.isCounting
        ? (state.countInterval = setInterval(() => {
            emit("timerCountingEmit");
          }, 1000))
        : clearInterval(state.countInterval);
    }

    return {
      ...toRefs(state),
      sectorClipPath,
      triggerCounting,
    };
  },
});
</script>

<style lang="scss" scoped>
.countdown-timer {
  &-controller {
    width: 90vh;
    height: 90vh;
    min-width: 70vh;
    min-height: 70vh;
    max-width: 50vw;
    max-height: 50vw;

    border-radius: 50%;
    border: 4px solid #00a7ff;
    background-color: transparent;

    position: absolute;
    top: 50%;
    left: 66.67%;
    transform: translate(-50%, -50%);
    z-index: 99;

    &-icon {
      width: 48px;
      height: 48px;
      transition: all 0.1s ease;

      &-wrapper {
        width: 20%;
        height: 20%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }

  &-sector {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    transform: rotate(45deg);
    background-color: #00a7ff;
  }

  &-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border-radius: 50%;
    border: 4px solid #00a7ff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.button-pause {
  width: 0;
  height: 48px;
  border-style: double;
  border-width: 0 0 0 48px;
  border-color: #fff;
  margin-left: 0;

  transition: all 0.3s ease;
  &-wrapper {
    background-color: #00a7ff;
  }
}

.button-start {
  width: 0;
  height: 48px;
  margin-left: 12px;
  border-style: solid;
  border-width: 24px 0 24px 48px;
  border-color: transparent transparent transparent #00a7ff;
  transition: all 0.3s ease;
  &-wrapper {
    background-color: #fff;
  }
}
</style>
