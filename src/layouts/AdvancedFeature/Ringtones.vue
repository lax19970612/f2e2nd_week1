<template>
  <div class="ringtones-wrapper">
    <header-bar title="work" />
    <div class="radio-group">
      <label
        class="custom-radio"
        v-for="(ringtone, index) in ringtoneList"
        :key="index"
      >
        <input
          type="radio"
          name="ringtone-work"
          :value="ringtone"
          v-model="ringtoneWork"
        />
        <div />
        <span>{{ ringtone }}</span>
      </label>
    </div>
    <header-bar style="margin-top: 56px" title="break" />
    <div class="radio-group">
      <label
        class="custom-radio"
        v-for="(ringtone, index) in ringtoneList"
        :key="index"
      >
        <input
          type="radio"
          name="ringtone-break"
          :value="ringtone"
          v-model="ringtoneBreak"
        />
        <div />
        <span>{{ ringtone }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import HeaderBar from "@/components/AdvancedFeature/HeaderBar.vue";

const ringtones = [
  "none",
  "default",
  "alarm",
  "alert",
  "beep",
  "bell",
  "bird",
  "bugle",
  "digital",
  "drop",
  "horn",
  "music",
  "ring",
  "warning",
  "whistle",
];

export default defineComponent({
  name: "Ringtones",
  components: {
    HeaderBar,
  },
  setup() {
    const state = reactive({
      ringtoneList: ringtones,
      ringtoneWork: "none",
      ringtoneBreak: "none",
    });

    return { ...toRefs(state) };
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
