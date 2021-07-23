<template>
  <div class="ringtones-wrapper">
    <header-bar title="work" />
    <div class="radio-group ringtones-work">
      <label
        class="custom-radio"
        v-for="(ringtone, index) in setting.list"
        :key="index"
      >
        <input
          type="radio"
          name="ringtone-work"
          :value="ringtone"
          :checked="ringtone === setting.work"
          @change="settingChange($event, 'work')"
        />
        <div />
        <span>{{ ringtone }}</span>
      </label>
    </div>
    <header-bar style="margin-top: 56px" title="break" />
    <div class="radio-group ringtones-break">
      <label
        class="custom-radio"
        v-for="(ringtone, index) in setting.list"
        :key="index"
      >
        <input
          type="radio"
          name="ringtone-break"
          :value="ringtone"
          :checked="ringtone === setting.break"
          @change="settingChange($event, 'break')"
        />
        <div />
        <span>{{ ringtone }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import HeaderBar from "@/components/AdvancedFeature/HeaderBar.vue";

export default defineComponent({
  name: "Ringtones",
  components: {
    HeaderBar,
  },
  props: {
    setting: {
      type: Object as PropType<{
        work: string | null;
        break: string | null;
        list: string[];
      }>,
      default: () => {
        return { work: null, break: null, list: [] };
      },
    },
  },
  setup(props, { emit }) {
    // @methods
    function settingChange(event: Event, type: string) {
      const element = event.target as HTMLInputElement;
      emit("ringtoneSettingChangeEmit", {
        type: type,
        value: element.value,
      });
    }

    return { settingChange };
  },
});
</script>

<style lang="scss" scoped>
.ringtones-wrapper {
  padding-left: 100px;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;

  .custom-radio {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
    cursor: pointer;

    width: calc(100% / 3);
    margin: 10px 0 15px 0;
    input[type="radio"] {
      position: absolute;
      width: 1em;
      height: 1em;
      opacity: 0.00001;

      + div {
        width: 24px;
        height: 24px;
        background-color: #fff;

        mask: url("~@/assets/svg/radio_button_unchecked_black_24dp.svg")
          no-repeat center / contain;
        -webkit-mask: url("~@/assets/svg/radio_button_unchecked_black_24dp.svg")
          no-repeat center / contain;

        transition: all 0.1s linear;
      }

      &:hover + div,
      &:checked + div {
        background-color: #ff4384;

        mask: url("~@/assets/svg/radio_button_checked_black_24dp.svg") no-repeat
          center / contain;
        -webkit-mask: url("~@/assets/svg/radio_button_checked_black_24dp.svg")
          no-repeat center / contain;
      }
    }

    span {
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      margin-left: 10px;
    }
  }
}
</style>
