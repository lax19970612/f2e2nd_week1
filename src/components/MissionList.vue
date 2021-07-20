<template>
  <div class="mission-list-wrapper">
    <div class="mission-list-row">
      <div class="mission-list-icon" />
      <div class="mission-list-content">the second thing to do today</div>
      <div class="mission-list-play-icon" />
    </div>
    <div class="mission-list-row">
      <div class="mission-list-icon" />
      <div class="mission-list-content">the third thing to do today</div>
      <div class="mission-list-play-icon" />
    </div>
    <div class="mission-list-row">
      <div class="mission-list-icon" />
      <div class="mission-list-content">the forth thing to do today</div>
      <div class="mission-list-play-icon" />
    </div>
    <div class="mission-list-row mission-list-getmore">MORE</div>
  </div>
</template>

<style lang="scss" scoped>
$mission_list_icon_size: 22px;
$mission_list_font_color: #003164;

.mission-list {
  &-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
  }

  &-row {
    width: 100%;
    display: flex;
    padding: 10px 0;
    border-bottom: 2px solid rgba(200, 200, 200, 0.7);
  }

  &-icon {
    min-width: $mission_list_icon_size;
    width: $mission_list_icon_size;
    min-height: $mission_list_icon_size;
    height: $mission_list_icon_size;

    background-color: $mission_list_font_color;
    mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat center /
      contain;
    -webkit-mask: url("~@/assets/svg/radio_button_unchecked_24dp.svg") no-repeat
      center / contain;
  }

  &-content {
    width: calc(100% - #{$mission_list_icon_size} * 2);
    text-transform: uppercase;
    font-weight: bold;
    color: $mission_list_font_color;
    padding: 0 5px;

    margin-top: -2px;
  }

  &-play-icon {
    min-width: $mission_list_icon_size;
    width: $mission_list_icon_size;
    min-height: $mission_list_icon_size;
    height: $mission_list_icon_size;

    cursor: pointer;

    background-color: $mission_list_font_color;
    mask: url("~@/assets/svg/play_circle_outline_24dp.svg") no-repeat center /
      contain;
    -webkit-mask: url("~@/assets/svg/play_circle_outline_24dp.svg") no-repeat
      center / contain;
  }

  &-getmore {
    border-bottom: 0;
    color: #00a7ff;
    justify-content: flex-end;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
