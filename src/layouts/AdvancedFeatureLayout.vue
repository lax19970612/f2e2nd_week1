<template>
  <section class="advanced-feature-layout" ref="root">
    <div class="table__cell__4 menu-wrapper relative">
      <div class="menu-group">
        <div
          class="menu-item-wrapper"
          :class="{ active: currentPage === 'todolist' }"
          @click="linkClick('todolist')"
        >
          <div class="menu-item-icon icon-list" />
          <div class="menu-item-context" v-if="advancedMode">to-do list</div>
        </div>
        <div
          class="menu-item-wrapper"
          :class="{ active: currentPage === 'analytics' }"
          @click="linkClick('analytics')"
        >
          <div class="menu-item-icon icon-chart" />
          <div class="menu-item-context" v-if="advancedMode">analytics</div>
        </div>
        <div
          class="menu-item-wrapper"
          :class="{ active: currentPage === 'ringtones' }"
          @click="linkClick('ringtones')"
        >
          <div class="menu-item-icon icon-ringtone" />
          <div class="menu-item-context" v-if="advancedMode">ringtones</div>
        </div>
      </div>
      <div class="playing-panel" v-if="advancedMode">
        <div class="timer-controller-wrapper relative">
          <div class="timer-controller-outer">
            <div class="timer-controller-inner">
              <div class="button-start" />
            </div>
          </div>
        </div>
        <div class="timer-content-wrapper relative">
          <div class="timer-content-remain-time">25:00</div>
          <div class="timer-content-mission">THE FIRST THING TO DO TODAY</div>
        </div>
      </div>
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
import Mission from "@/interfaces/Mission";

export default defineComponent({
  name: "AdvancedFeatureLayout",
  components: {
    MissionInput,
    MissionList,
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

    const state = reactive({
      advancedMode: props.advancedMode,
      currentPage: null as null | string,
    });

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
        rootDom
          .querySelectorAll<HTMLElement>(".menu-item-wrapper")
          .forEach((item: HTMLElement) => {
            item.style.justifyContent = "flex-start";
          });
      }
      state.advancedMode = true;
      emit("changeModeEmit", state.advancedMode);
    }

    function closeAdvancedPage() {
      const rootDom = root.value;
      if (rootDom) {
        rootDom.style.left = "66.67%";
        rootDom
          .querySelectorAll<HTMLElement>(".menu-item-wrapper")
          .forEach((item: HTMLElement) => {
            item.style.justifyContent = "flex-end";
          });
      }
      state.advancedMode = false;
      emit("changeModeEmit", state.advancedMode);
    }

    return {
      ...toRefs(state),
      root,
      linkClick,
      closeAdvancedPage,
    };
  },
});
</script>

<style lang="scss" scoped>
$button_size: 36px;

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

.menu-item {
  &-wrapper {
    min-height: 55px;
    margin: 30px 0;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover > .menu-item-icon {
      background-color: #ff4384;
    }

    &:hover > .menu-item-context {
      color: #ff4384;
    }
  }

  &-wrapper.active {
    .menu-item-icon {
      background-color: #ff4384;
    }
    .menu-item-context {
      color: #ff4384;
    }
  }

  &-icon {
    margin-right: 10px;
    min-width: 36px;
    min-height: 36px;
    background-color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }

  &-context {
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    white-space: wrap;
    transition: all 0.3s ease;
  }
}

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

.icon-list {
  mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg") no-repeat
    center / contain;
  -webkit-mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg")
    no-repeat center / contain;
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
