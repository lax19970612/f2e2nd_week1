<template>
  <div class="menu-group">
    <div
      v-for="(page, index) in pages"
      :key="index"
      class="menu-item-wrapper"
      :class="{ active: currentPage === page, 'flex-start': advancedMode }"
      @click="itemClick(page)"
    >
      <div class="menu-item-icon" :class="`icon-${page}`" />
      <div class="menu-item-context" v-if="advancedMode">{{ page }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
const pages = ["todolist", "analytics", "ringtones"];

export default defineComponent({
  name: "MenuGroup",
  props: {
    advancedMode: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: String || null,
      default: null,
    },
  },
  setup(props, { emit }) {
    // @data
    const state = reactive({
      pages: pages,
    });

    // @method
    function itemClick(page: string) {
      emit("menuItemClickEmit", page);
    }

    return {
      ...toRefs(state),
      itemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
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

  &-wrapper.flex-start {
    justify-content: flex-start;
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

.icon-todolist {
  mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg") no-repeat
    center / contain;
  -webkit-mask: url("~@/assets/svg/format_list_bulleted_black_24dp.svg")
    no-repeat center / contain;
}

.icon-analytics {
  mask: url("~@/assets/svg/insert_chart_black_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/insert_chart_black_24dp.svg") no-repeat
    center / contain;
}

.icon-ringtones {
  mask: url("~@/assets/svg/library_music_black_24dp.svg") no-repeat center /
    contain;
  -webkit-mask: url("~@/assets/svg/library_music_black_24dp.svg") no-repeat
    center / contain;
}
</style>
