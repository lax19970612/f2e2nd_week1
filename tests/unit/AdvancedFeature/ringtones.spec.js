import { shallowMount } from "@vue/test-utils";
import Ringtones from "@/layouts/AdvancedFeature/Ringtones";

describe("layouts/advancedFeature/Ringtones.vue", () => {
  it("props data test", () => {
    const mockDataList = ["none", "default", "alarm", "alert"];

    const wrapper = shallowMount(Ringtones, {
      propsData: {
        setting: {
          work: mockDataList[0],
          break: mockDataList[0],
          list: mockDataList,
        },
      },
    });

    expect(
      wrapper.find(".ringtones-work").findAll(".custom-radio").length
    ).toEqual(4);
    expect(
      wrapper.find(".ringtones-work").findAll("input:checked").length
    ).toEqual(1);
    expect(
      wrapper.find(".ringtones-work").find("input:checked").element.value
    ).toEqual("none");

    expect(
      wrapper.find(".ringtones-break").findAll(".custom-radio").length
    ).toEqual(4);
    expect(
      wrapper.find(".ringtones-break").findAll("input:checked").length
    ).toEqual(1);
    expect(
      wrapper.find(".ringtones-break").find("input:checked").element.value
    ).toEqual("none");
  });

  it("onchange method: click radio test", () => {
    const mockDataList = ["none", "default", "alarm", "alert"];

    const wrapper = shallowMount(Ringtones, {
      propsData: {
        setting: {
          work: mockDataList[0],
          break: mockDataList[0],
          list: mockDataList,
        },
      },
    });

    const ringtonesBreakRadios = wrapper
      .find(".ringtones-work")
      .findAll(".custom-radio");
    ringtonesBreakRadios[2].find("input").trigger("click");

    expect(wrapper.emitted().ringtoneSettingChangeEmit).toBeTruthy();
    expect(wrapper.emitted().ringtoneSettingChangeEmit.length).toEqual(1);
    expect(wrapper.emitted().ringtoneSettingChangeEmit[0]).toEqual([
      { type: "work", value: "alarm" },
    ]);
  });
});
