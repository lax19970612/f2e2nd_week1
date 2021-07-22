<template>
  <section class="advanced-feature-layout" ref="root">
    <div class="table__cell__4 menu-wrapper relative">
      <menu-group
        :advancedMode="advancedMode"
        @menuItemClickEmit="menuItemClickEmitHandler"
      />
      <playing-panel v-if="advancedMode" />
    </div>
    <div class="table__cell__6 menu-wrapper">
      <div class="todolist-wrapper" v-if="currentPage === 'todolist'">
        <mission-input />
        <div class="custom-header-bar">TO-DO</div>
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
        <div class="custom-header-bar">DONE</div>
        <mission-list
          :missionList="missionList"
          :options="{
            showComplete: true,
            limit: -1,
            showFirstMission: true,
            inAdvancedMode: true,
          }"
          @executeMissionEmit="executeMissionEmitHandler"
        />
      </div>
      <div
        class="analytics-wrapper"
        v-else-if="currentPage === 'analytics'"
      ></div>
      <div
        class="ringtones-wrapper"
        v-else-if="currentPage === 'ringtones'"
      ></div>
    </div>
    <div class="table__cell__2 menu-wrapper">
      <div class="exit-button" @click="closeAdvancedPage" />
      <div class="logo">POMODORO</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import MissionInput from "@/components/MissionInput.vue";
import MissionList from "@/components/MissionList.vue";

import MenuGroup from "@/components/AdvancedFeature/MenuGroup.vue";
import PlayingPanel from "@/components/AdvancedFeature/PlayingPanel.vue";

import Mission from "@/interfaces/Mission";

export default defineComponent({
  name: "AdvancedFeatureLayout",
  components: {
    MissionInput,
    MissionList,
    MenuGroup,
    PlayingPanel,
  },
  props: {
    advancedMode: Boolean,
    missionList: {
      type: Array as PropType<Mission[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const root = ref<HTMLDivElement>();
    // @data
    const state = reactive({
      advancedMode: props.advancedMode,
      currentPage: null as null | string,
    });

    // @methods: emit handler
    function menuItemClickEmitHandler(preload: string) {
      state.currentPage = preload;
      if (!props.advancedMode) openAdvancedPage();
    }

    // @methods
    function linkClick(page: string) {
      state.currentPage = page;
      if (!props.advancedMode) {
        openAdvancedPage();
      }
    }

    function openAdvancedPage() {
      const rootDom = root.value;
      if (rootDom) {
        rootDom.style.left = "0px";
      }
      state.advancedMode = true;
      emit("changeModeEmit", state.advancedMode);
    }

    function closeAdvancedPage() {
      const rootDom = root.value;
      if (rootDom) {
        rootDom.style.left = "66.67%";
      }
      state.advancedMode = false;
      emit("changeModeEmit", state.advancedMode);
    }

    return {
      ...toRefs(state),
      root,
      menuItemClickEmitHandler,
      linkClick,
      closeAdvancedPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.advanced-feature-layout {
  position: absolute;
  top: 0;
  left: 66.67%;

  display: flex;

  width: 100%;
  height: 100vh;
  background-color: #003164;
  transition: left 0.5s ease;
}

.logo {
  position: fixed;
  right: 40px;
  bottom: 40px;

  margin-top: 50%;
  writing-mode: vertical-lr;
  width: 36px;
  font-weight: bold;
  color: #fff;
  font-size: 24px;
}

.todolist-wrapper {
  width: 100%;
  height: 100%;
  padding: 30px 0 30px 100px;
}

.custom-header-bar {
  width: 100%;
  height: 44px;
  margin-top: 56px;
  padding: 0 16px;
  background-color: #ffffff33;
  color: #fff;

  font-size: 24px;
  line-height: 44px;
  text-transform: uppercase;
  font-weight: bold;
}

.exit-button {
  margin-top: 24px;
  width: 36px;
  cursor: pointer;
  font-size: 36px;
  color: #fff;
  float: right;
  text-align: center;
  transition: 0.1s;

  &:after {
    display: inline-block;
    content: "\00d7";
  }

  &:hover {
    transform: scale(1.2);
  }
}
</style>

<style lang="scss">
@mixin table__cell($ratio) {
  width: calc(100% / 12 * #{$ratio});
  height: 100%;
}
.table__cell__1 {
  @include table__cell(1);
}
.table__cell__2 {
  @include table__cell(2);
}
.table__cell__3 {
  @include table__cell(3);
}
.table__cell__4 {
  @include table__cell(4);
}
.table__cell__5 {
  @include table__cell(5);
}
.table__cell__6 {
  @include table__cell(6);
}
.table__cell__7 {
  @include table__cell(7);
}
.table__cell__8 {
  @include table__cell(8);
}
.table__cell__9 {
  @include table__cell(9);
}
.table__cell__10 {
  @include table__cell(10);
}
.table__cell__11 {
  @include table__cell(11);
}
.table__cell__12 {
  @include table__cell(12);
}

.relative {
  position: relative;
}
.menu-wrapper {
  padding: 40px;
}
</style>
