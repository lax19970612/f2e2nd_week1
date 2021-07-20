import { shallowMount } from "@vue/test-utils";
import MissionInput from "@/components/MissionInput.vue";

describe("components/MissionInput.vue test", () => {
  it("addMission method test", async () => {
    const wrapper = shallowMount(MissionInput);
    wrapper.find("input").setValue("addMission test");
    wrapper.find(".mission-input-add-icon").trigger("click");

    expect(wrapper.emitted().addMissionEmit).toBeTruthy();
    expect(wrapper.emitted().addMissionEmit.length).toEqual(1);
    expect(wrapper.emitted().addMissionEmit[0]).toEqual(["addMission test"]);
  });
});
