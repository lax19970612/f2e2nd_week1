import { shallowMount, mount } from "@vue/test-utils";
import MenuGroup from "@/components/AdvancedFeature/MenuGroup.vue";

describe("components/AdvancedFeature/MenuGroup.vue", () => {
  it("props test", async () => {
    const wrapper = shallowMount(MenuGroup);

    // default: base mode
    expect(wrapper.findAll(".flex-start").length).toEqual(0);
    expect(wrapper.findAll(".menu-item-context").length).toEqual(0);

    // advanced mode
    wrapper.setProps({
      advancedMode: true,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll(".flex-start").length).toEqual(3);
    expect(wrapper.findAll(".menu-item-context").length).toEqual(3);
  });

  it("method: itemClick test", async () => {
    const wrapper = mount(MenuGroup);

    // test click first menu item
    wrapper.find(".menu-item-wrapper").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().menuItemClickEmit).toBeTruthy();
    expect(wrapper.emitted().menuItemClickEmit.length).toEqual(1);
    expect(wrapper.emitted().menuItemClickEmit[0]).toEqual(["todolist"]);
  });
});
