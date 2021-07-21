<template>
<section class="advanced-feature-layout" ref="root">
  <div class="feature-wrapper" ref="list">
    <div class="feature-item-wrapper" @click="openAdvancedPage('missionList')" >
      <div class="feature-item-icon icon-list" />
      <div class="feature-item-context" v-if="advancedMode">to-do list</div>
    </div>
    <div class="feature-item-wrapper" @click="openAdvancedPage('chart')" >
      <div class="feature-item-icon icon-chart" />
      <div class="feature-item-context" v-if="advancedMode">analytics</div>
    </div>
    <div class="feature-item-wrapper" @click="openAdvancedPage('ringtone')" >
      <div class="feature-item-icon icon-ringtone" />
      <div class="feature-item-context" v-if="advancedMode">ringtones</div>
    </div>
    <div class="logo">POMODORO</div>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: 'AdvancedFeatureLayout',
  props: {
    advancedMode: Boolean
  },
  setup(props, { emit }) {
    const root = ref<HTMLDivElement>()
    const list = ref<HTMLDivElement>()

    const state = reactive({
      advancedMode: props.advancedMode
    })

    function openAdvancedPage(page: string) {
      const rootDom = root.value
      const listDom = list.value
      if (rootDom) rootDom.style.left = '0px'
      if (listDom) listDom.style.alignItems = 'flex-start'
      state.advancedMode = true
      emit('changeModeEmit', state.advancedMode)
    }

    return {
      ...toRefs(state),
      root,
      list,
      openAdvancedPage
    }
  },
});
</script>

<style lang="scss" scoped>
.advanced-feature-layout {
  position: absolute;
  top: 0;
  left: 66.67%;

  width: 100%;
  min-height: 100vh;
  background-color: #003164;

  padding: 40px;
  transition: left .5s ease;
}

.feature-wrapper {
  width: 30%;
  height: calc(100vh - 80px);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
}

.feature-item {
  &-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .1s ease;

    &:hover > .feature-item-icon {
      background-color: #FF4384;
    }

    &:hover > .feature-item-context {
      color: #FF4384;
    }
  }

  &-icon {
    width: 36px;
    height: 36px;
    margin: 7% 0;
    background-color: rgba(255, 255, 255, 0.3);
    transition: all .3s ease;
  }

  &-context {
    margin-left: 20px;
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    white-space: nowrap;
    transition: all .3s ease;
  }
}

.logo {
  margin-top: 50%;
  writing-mode: vertical-lr;
  width: 36px;
  font-weight: bold;
  color: #fff;
  font-size: 24px;
}

.icon-list {
  mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg") no-repeat
    center / contain;
}

.icon-chart {
  mask: url("~@/assets/svg/insert_chart_black_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/insert_chart_black_24dp.svg") no-repeat
    center / contain;
}

.icon-ringtone {
  mask: url("~@/assets/svg/library_music_black_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/library_music_black_24dp.svg") no-repeat
    center / contain;
}

</style>
