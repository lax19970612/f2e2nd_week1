<template>
  <div class="mission-input-wrapper">
    <input
      type="text"
      class="mission-input-content"
      placeholder="add a new mission"
      v-model="missionName"
    />
    <div class="mission-input-add-icon" @click="addMission">+</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      missionName: ''
    })

    return { ...toRefs(state) }
  },
  methods: {
    addMission () {
      this.$emit('addMissionEmit', this.missionName)
    }
  }
});
</script>

<style lang="scss" scoped>
$mission_input_font_color: #00a7ff;
$mission_input_div_height: 45px;

.mission-input {
  &-wrapper {
    background-color: #fff;
    width: 100%;
    height: $mission_input_div_height;

    display: flex;
    color: $mission_input_font_color;
  }

  &-content {
    border: 0;
    width: 85%;
    height: 100%;
    padding: 5px 10px;
    line-height: $mission_input_div_height;
    color: $mission_input_font_color;
    font-weight: bold;

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: $mission_input_font_color;
      font-weight: bold;
      font-style: italic;
      text-transform: uppercase;
    }
  }

  &-add-icon {
    width: 15%;
    min-width: 30px;
    height: 100%;
    text-align: center;
    line-height: $mission_input_div_height;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
